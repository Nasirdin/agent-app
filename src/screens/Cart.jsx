import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  RefreshControl,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeProductInCart } from "../store/slices/userSlice";
import { setActiveProduct } from "../store/slices/productSlice";
import Toast from "react-native-toast-message";
import { addOrderFunc } from "../store/slices/orderSlice";
import { useFocusEffect } from "@react-navigation/native";
import { fetchShops } from "../store/slices/shopSlice";

const Cart = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cart } = useSelector((state) => state.user);
  const { shops } = useSelector((state) => state.shop);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchCart());
      dispatch(fetchShops());
    }, [dispatch])
  );

  const handleSelectItem = (product) => {
    setSelectedItems((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  const handleRemoveItem = (id) => {
    setItemToRemove(id);
    setModalVisible(true);
  };

  const confirmRemoveItem = async () => {
    if (!itemToRemove) return;
    await dispatch(removeProductInCart(itemToRemove));
    await dispatch(fetchCart());
    setModalVisible(false);
    setItemToRemove(null);
  };

  const totalAmount = useMemo(
    () =>
      selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [selectedItems]
  );

  const handleProductPress = (product) => {
    dispatch(setActiveProduct(product));
    navigation.navigate("Product");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchCart());
    setRefreshing(false);
  };

  const showToast = (type, message) => {
    Toast.show({
      type,
      text1: message,
      position: "top",
      autoHide: true,
      visibilityTime: 3000,
    });
  };

  const addOrder = async () => {
    if (!selectedAddress) {
      showToast("error", "Добавьте адрес доставки");
      return;
    }
    if (selectedItems.length === 0) {
      showToast("error", "Нет выбранных товаров для оформления заказа.");
      return;
    }
    try {
      setLoading(true);
      const orders = selectedItems.reduce((acc, item) => {
        const ownerId = item.owner.id;
        if (!acc[ownerId]) acc[ownerId] = [];
        acc[ownerId].push({ productId: item.id, quantity: item.quantity });
        return acc;
      }, {});

      await Promise.all(
        Object.values(orders).map((products) =>
          dispatch(addOrderFunc({ products, shopId: selectedAddress }))
        )
      );

      showToast("success", "Заказ успешно оформлен");
      setSelectedItems([]);
      setOrderModalVisible(false);
      setSelectedAddress(null);
    } catch (error) {
      showToast("error", error?.message || "Ошибка при оформлении заказа");
    } finally {
      setLoading(false);
    }
  };

  const renderProductItem = (product) => (
    <TouchableOpacity
      key={product.id}
      style={styles.cartItem}
      onPress={() => handleProductPress(product)}
    >
      <View style={styles.itemDetailsLeft}>
        <Image
          source={{
            uri: product.images?.[0] || "https://via.placeholder.com/100",
          }}
          style={styles.itemImage}
        />
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>{product.name || "Без названия"}</Text>
          <Text>Количество: {product.quantity}</Text>
          <Text>Цена: {product.price} Сом</Text>
          <Text>Производитель: {product.owner?.name || "-"}</Text>
          <Text>Сумма: {product.price * product.quantity} Сом</Text>
        </View>
      </View>
      <View style={styles.itemDetailsRight}>
        <Checkbox
          value={selectedItems.some((item) => item.id === product.id)}
          onValueChange={() => handleSelectItem(product)}
          style={styles.checkbox}
        />
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveItem(product.id)}
        >
          <Text style={styles.removeButtonText}>Удалить</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Корзина</Text>
        {!!totalAmount && (
          <Text style={styles.totalAmountText}>
            Общая сумма: {totalAmount} Сом
          </Text>
        )}
        <ScrollView
          style={styles.cartList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {cart?.owners?.length ? (
            cart.owners.map((owner) => (
              <View key={owner.owner}>
                <Text style={styles.ownerTitle}>{owner.owner}</Text>
                {owner.products.map(renderProductItem)}
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Ваша корзина пуста</Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate("Products")}
              >
                <Text style={styles.emptyButtonText}>Выбрать товары</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {!!selectedItems.length && (
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => setOrderModalVisible(true)}
          >
            <Text style={styles.checkoutButtonText}>Оформить заказ</Text>
          </TouchableOpacity>
        )}

        {/* Удаление */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Подтвердите удаление</Text>
              <Text style={styles.modalText}>
                Вы уверены, что хотите удалить товар?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Отмена</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={confirmRemoveItem}
                >
                  <Text style={styles.modalButtonText}>Удалить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Подтверждение заказа */}
        <Modal visible={orderModalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Оформить заказ на сумму {totalAmount} Сом?
              </Text>

              <Text style={styles.modalTitle}>Выберите адрес доставки:</Text>

              <View style={styles.addressList}>
                {!shops
                  ? ""
                  : shops.map((address) => (
                      <TouchableOpacity
                        key={address.id}
                        style={[
                          styles.addressItem,
                          selectedAddress === address.id &&
                            styles.selectedAddressItem,
                        ]}
                        onPress={() => setSelectedAddress(address.id)}
                      >
                        <Text
                          style={[
                            styles.addressText,
                            selectedAddress === address.id &&
                              styles.selectedAddressText,
                          ]}
                        >
                          {address.region}/{address.district}/{address.street}/
                          {address.shopNumber}
                        </Text>
                      </TouchableOpacity>
                    ))}
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setOrderModalVisible(false);
                    setSelectedAddress(null);
                  }}
                >
                  <Text style={styles.modalButtonText}>Отмена</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, loading && styles.loadingButton]}
                  onPress={addOrder}
                  disabled={loading}
                >
                  <Text style={styles.modalButtonText}>Подтвердить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  wrapper: { flex: 1, padding: 10 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  cartList: { flex: 1 },
  ownerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#008bd9",
    marginTop: 10,
  },
  cartItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  itemDetailsLeft: { flex: 1, flexDirection: "row", alignItems: "center" },
  itemImage: { width: 60, height: 60, borderRadius: 10 },
  itemText: { marginLeft: 10, flexShrink: 1 },
  itemTitle: { fontSize: 16, fontWeight: "600" },
  itemDetailsRight: { alignItems: "center", gap: 10 },
  checkbox: { width: 30, height: 30 },
  removeButton: { backgroundColor: "#ff4f4f", padding: 10, borderRadius: 6 },
  removeButtonText: { color: "#fff" },
  checkoutButton: {
    backgroundColor: "#008bd9",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: { color: "#fff", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 20,
    color: "#008bd9",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#008bd9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  loadingButton: { backgroundColor: "#999" },
  modalButtonText: { color: "#fff", fontSize: 16 },
  emptyContainer: { alignItems: "center", marginTop: 100 },
  emptyText: { fontSize: 16, color: "#999", marginBottom: 20 },
  emptyButton: {
    backgroundColor: "#008bd9",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  emptyButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  totalAmountText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomColor: "#008bd9",
    borderBottomWidth: 2,
  },

  addressList: {
    width: "100%",
    marginBottom: 20,
    gap: 8,
  },
  addressItem: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
  },
  selectedAddressItem: {
    backgroundColor: "#008bd9",
  },
  addressText: {
    fontSize: 16,
    color: "#333",
  },
  selectedAddressText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default Cart;
