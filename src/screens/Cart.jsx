import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Checkbox } from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/slices/userSlice";
import { setActiveProduct } from "../store/slices/productSlice";
import { API_URL } from "@env";
import axios from "axios";
import Toast from "react-native-toast-message";

const Cart = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOrderModalVisible, setOrderModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [minOrderAmount, setMinOrderAmount] = useState({});
  const { cart, user } = useSelector((state) => state.user);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      dispatch(fetchCart(user.id));
    }
  }, [user.id]);

  const groupedByOwner = useMemo(() => {
    if (!Array.isArray(cart)) return {};
    return cart.reduce((acc, item) => {
      const ownerName = item.productId?.owner?.name || "Неизвестный продавец";
      if (!acc[ownerName]) acc[ownerName] = [];
      acc[ownerName].push(item);
      return acc;
    }, {});
  }, [cart]);

  const handleSelectItem = (id) => {
    if (!id) {
      return;
    }
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleRemoveItem = (id) => {
    setItemToRemove(id);
    setModalVisible(true);
  };

  const confirmRemoveItem = () => {
    dispatch(fetchCart(user.id));
    setModalVisible(false);
    setItemToRemove(null);
  };

  const cancelRemoveItem = () => {
    setModalVisible(false);
    setItemToRemove(null);
  };

  const cancelOrder = () => {
    setOrderModalVisible(false);
  };

  const confirmOrder = () => {
    addOrder();
    setOrderModalVisible(false);
  };

  const totalAmount = selectedItems.reduce((total, id) => {
    const item = cart.find((item) => item.productId._id === id);
    return total + (item ? item.productId.price * item.quantity : 0);
  }, 0);

  const handleProduct = (product) => {
    dispatch(setActiveProduct(product));
    navigation.navigate("Product");
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (user.id) {
      dispatch(fetchCart(user.id));
    }
    setRefreshing(false);
  };

  const showToast = (type, message) => {
    Toast.show({
      type,
      position: "top",
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const addOrder = async () => {
    try {
      const selectedProducts = cart.filter((item) =>
        selectedItems.includes(item.productId._id)
      );

      if (selectedProducts.length === 0) {
        showToast("error", "Нет выбранных товаров для оформления заказа.");
        return;
      }

      const ordersByOwner = selectedProducts.reduce((acc, item) => {
        const ownerId = item.productId.owner._id;
        if (!acc[ownerId]) {
          acc[ownerId] = [];
        }
        acc[ownerId].push({
          productId: item.productId._id,
          quantity: item.quantity,
        });
        return acc;
      }, {});

      for (const [ownerId, products] of Object.entries(ordersByOwner)) {
        const orderData = {
          products,
          customer: user.id,
          owner: ownerId,
        };

        const response = await axios.post(API_URL + "/orders", orderData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.data) {
          showToast("error", "Ошибка сети");
          return;
        }

        showToast("success", "Заказ успешно оформлен");

        const deleteResponse = await axios.delete(
          API_URL + `/cart/${user.id}/remove-items`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            data: { productIds: products.map((p) => p.productId) },
          }
        );

        if (!deleteResponse.data) {
          throw new Error(
            deleteResponse.data.message ||
              "Ошибка при удалении товаров из корзины"
          );
        }

        dispatch(fetchCart());
        setSelectedItems([]);
      }
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Корзина</Text>

        <ScrollView
          style={styles.cartList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreButtonText}>
              Посмотреть больше товаров
            </Text>
          </TouchableOpacity>

          {Object.entries(groupedByOwner).map(([owner, items]) => (
            <View key={owner}>
              <Text style={styles.ownerTitle}>{owner}</Text>
              {items.map((item) => {
                if (!item.productId) return null;
                return (
                  <TouchableOpacity
                    key={item._id}
                    style={styles.cartItem}
                    onPress={() => handleProduct(item.productId)}
                  >
                    <View style={styles.itemDetailsLeft}>
                      <Image
                        source={{
                          uri:
                            item.productId?.images?.[0] ||
                            "https://via.placeholder.com/100",
                        }}
                        style={styles.itemImage}
                      />
                      <View style={styles.itemText}>
                        <Text style={styles.itemTitle}>
                          {item.productId?.name || "Без названия"}
                        </Text>
                        <Text>Количество: {item.quantity || 0}</Text>
                        <Text>Цена: {item.productId?.price || 0} KGS</Text>
                        <Text>Производитель: {owner}</Text>
                      </View>
                    </View>
                    <View style={styles.itemDetailsRight}>
                      <Checkbox
                        value={selectedItems.includes(item.productId?._id)}
                        onValueChange={() =>
                          handleSelectItem(item.productId?._id)
                        }
                        style={styles.checkbox}
                      />
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemoveItem(item.productId?._id)}
                      >
                        <Text style={styles.removeButtonText}>Удалить</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          <Text style={styles.totalAmountText}>
            Общая сумма: {totalAmount} KGS
          </Text>
        </ScrollView>

        {selectedItems.length > 0 && (
          <TouchableOpacity
            style={styles.checkoutButton}
            disabled={totalAmount < minOrderAmount[selectedItems[0]]}
            onPress={() => setOrderModalVisible(true)}
          >
            <Text style={styles.checkoutButtonText}>Оформить заказ</Text>
          </TouchableOpacity>
        )}

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={cancelRemoveItem}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Подтвердить удаление</Text>
              <Text style={styles.modalText}>
                Вы уверены, что хотите удалить этот товар?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={cancelRemoveItem}
                >
                  <Text style={styles.modalButtonText}>Отмена</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={confirmRemoveItem}
                >
                  <Text style={styles.modalButtonText}>Подтвердить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={isOrderModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={cancelOrder}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Подтвердить заказ</Text>
              <Text style={styles.modalText}>
                Вы уверены, что хотите оформить заказ на выбранные товары?
              </Text>

              <Text style={styles.modalTotalAmount}>
                Общая сумма: {totalAmount} KGS
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={cancelOrder}
                >
                  <Text style={styles.modalButtonText}>Отмена</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={confirmOrder}
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
  },
  wrapper: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  cartList: {
    flex: 1,
  },
  ownerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "#008bd9",
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
    width: "100%",
    height: 150,
  },
  modalTotalAmount: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
    color: "#008bd9",
  },
  itemDetailsLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemText: {
    marginLeft: 15,
    flex: 1,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 5,
  },
  itemDetailsRight: {
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: "#f44336",
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
  },
  checkoutButton: {
    backgroundColor: "#008bd9",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  viewMoreButton: {
    backgroundColor: "#008bd9",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  viewMoreButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#008bd9",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  checkbox: {
    borderWidth: 2,
    borderColor: "#008bd9",
    width: 30,
    height: 30,
  },
});

export default Cart;
