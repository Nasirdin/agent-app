import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
} from "react-native";
import { Checkbox } from "expo-checkbox";

const Cart = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      title: "Товар 1",
      img: "https://via.placeholder.com/150",
      quantity: 1,
      price: 1500,
      manufacturer: "Кола",
    },
    {
      id: "2",
      title: "Товар 2",
      img: "https://via.placeholder.com/150",
      quantity: 2,
      price: 2500,
      manufacturer: "Шоро",
    },
    {
      id: "3",
      title: "Товар 3",
      img: "https://via.placeholder.com/150",
      quantity: 1,
      price: 1000,
      manufacturer: "Кола",
    },
  ]);
  const [minOrderAmount, setMinOrderAmount] = useState({
    Kola: 5000,
    Shoro: 1000,
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleSelectItem = (id) => {
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
    setCartItems(cartItems.filter((item) => item.id !== itemToRemove));
    setModalVisible(false);
    setItemToRemove(null);
  };

  const cancelRemoveItem = () => {
    setModalVisible(false);
    setItemToRemove(null);
  };

  const totalAmount = selectedItems.reduce((total, id) => {
    const item = cartItems.find((item) => item.id === id);
    return total + item.price * item.quantity;
  }, 0);

  const groupedByManufacturer = cartItems.reduce((acc, item) => {
    acc[item.manufacturer] = acc[item.manufacturer] || [];
    acc[item.manufacturer].push(item);
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Корзина</Text>

        <ScrollView style={styles.cartList}>
          {Object.entries(groupedByManufacturer).map(
            ([manufacturer, items]) => (
              <View key={manufacturer}>
                <Text style={styles.manufacturerTitle}>{manufacturer}</Text>

                {items.map((item) => (
                  <View key={item.id} style={styles.cartItem}>
                    <View style={styles.itemDetailsLeft}>
                      <Image
                        source={{ uri: item.img }}
                        style={styles.itemImage}
                      />
                      <View style={styles.itemText}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text>Количество: {item.quantity}</Text>
                        <Text>Цена: {item.price} KGS</Text>
                        <Text>Производитель: {manufacturer}</Text>
                      </View>
                    </View>
                    <View style={styles.itemDetailsRight}>
                      <Checkbox
                        value={selectedItems.includes(item.id)}
                        onValueChange={() => handleSelectItem(item.id)}
                      />
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemoveItem(item.id)}
                      >
                        <Text style={styles.removeButtonText}>Удалить</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )
          )}

          {totalAmount < minOrderAmount.Kola && totalAmount > 0 && (
            <Text style={styles.warningText}>
              Минимальная сумма для производителя "Кола" составляет{" "}
              {minOrderAmount.Kola} KGS. Добавьте больше товаров или увеличьте
              количество.
            </Text>
          )}

          <Text style={styles.totalAmountText}>
            Общая сумма: {totalAmount} KGS
          </Text>

          {/* Кнопка для просмотра большего количества товаров у производителя */}
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreButtonText}>
              Посмотреть больше товаров
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {selectedItems.length > 0 && (
          <TouchableOpacity
            style={styles.checkoutButton}
            disabled={totalAmount < minOrderAmount.Kola}
          >
            <Text style={styles.checkoutButtonText}>Оформить заказ</Text>
          </TouchableOpacity>
        )}

        {/* Модальное окно для подтверждения удаления */}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  manufacturerTitle: {
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
    height: 150, // высота карточки
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
    marginTop: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  warningText: {
    color: "#f44336",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
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
});

export default Cart;
