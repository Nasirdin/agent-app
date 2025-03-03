import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from "react-native";
import { API_URL } from "@env";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import axios from "axios";

const Address = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAddressIndex, setCurrentAddressIndex] = useState(null);

  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [street, setStreet] = useState("");
  const [shopNumber, setShopNumber] = useState("");
  const [shopName, setShopName] = useState("");
  const [sellerPhoneNumber, setSellerPhoneNumber] = useState("");

  const { user } = useSelector((state) => state.user);

  // const createDeliveryAddress = async () => {
  //   const response = axios.post(API_URL + "/address", {
  //     address: `${region}/${district}/${village}${street}/${shopumber}`,
  //     phoneNumber: sellerPhoneNumber,
  //     user: user.id,
  //   });

  //   console.log(response);
  // };

  // Закрытие экрана по кнопке "назад"
  const handleBackPress = useCallback(() => {
    navigation.goBack();
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [handleBackPress]);

  // Сохранение адреса (добавление / редактирование)
  const handleSave = async () => {
    if (
      !region ||
      !district ||
      !street ||
      !shopNumber ||
      !shopName ||
      !sellerPhoneNumber
    ) {
      Alert.alert("Ошибка", "Заполните все обязательные поля");
      return;
    }
    const response = await axios.post(`${API_URL}/address/${user.id}`, {
      address: `${region}/${district}/${street}/${shopNumber}`,
      phoneNumber: sellerPhoneNumber,
    });
    console.log(user.id);
    console.log("Ответ сервера:", response.data);
    Alert.alert("Успешно", "Адрес сохранен!");
  };

  // Удаление адреса
  const handleDelete = (index) => {
    Alert.alert(
      "Удалить адрес?",
      "Вы уверены, что хотите удалить этот адрес?",
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Удалить",
          onPress: () => {
            setAddresses((prev) => prev.filter((_, i) => i !== index));
          },
        },
      ]
    );
  };

  // Редактирование адреса
  const handleEdit = (index) => {
    const addressToEdit = addresses[index];
    setRegion(addressToEdit.region);
    setDistrict(addressToEdit.district);
    setVillage(addressToEdit.village);
    setStreet(addressToEdit.street);
    setShopNumber(addressToEdit.shopNumber);
    setShopName(addressToEdit.shopName);
    setSellerPhoneNumber(addressToEdit.sellerPhoneNumber);
    setIsEditMode(true);
    setCurrentAddressIndex(index);
    setModalVisible(true);
  };

  // Очистка формы
  const resetForm = () => {
    setRegion("");
    setDistrict("");
    setVillage("");
    setStreet("");
    setShopNumber("");
    setShopName("");
    setSellerPhoneNumber("");
    setIsEditMode(false);
    setCurrentAddressIndex(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, padding: 15 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#008bd9" />
        </TouchableOpacity>

        <ScrollView style={styles.addressList}>
          {addresses.map((address, index) => (
            <View key={index} style={styles.addressCard}>
              <Text style={styles.shopTitle}>Магазин: {address.shopName}</Text>
              <Text style={styles.addressText}>
                {address.region}, {address.district},{" "}
                {address.village ? `${address.village},` : ""} {address.street}{" "}
                {address.shopNumber}
              </Text>
              <Text style={styles.phoneText}>
                Телефон: {address.sellerPhoneNumber}
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(index)}
                >
                  <Text style={styles.editButtonText}>Изменить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(index)}
                >
                  <Text style={styles.deleteButtonText}>Удалить</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>Добавить адрес</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView>
                  <Text style={styles.title}>
                    {isEditMode ? "Изменение адреса" : "Добавление адреса"}
                  </Text>

                  {[
                    { label: "Область", value: region, setter: setRegion },
                    { label: "Район", value: district, setter: setDistrict },
                    {
                      label: "Село (необязательно)",
                      value: village,
                      setter: setVillage,
                    },
                    { label: "Улица", value: street, setter: setStreet },
                    {
                      label: "Номер дома",
                      value: shopNumber,
                      setter: setShopNumber,
                      keyboardType: "numeric",
                    },
                    {
                      label: "Название магазина",
                      value: shopName,
                      setter: setShopName,
                    },
                    {
                      label: "Номер продавца",
                      value: sellerPhoneNumber,
                      setter: setSellerPhoneNumber,
                      keyboardType: "phone-pad",
                    },
                  ].map((field, idx) => (
                    <View key={idx}>
                      <Text style={styles.label}>{field.label}</Text>
                      <TextInput
                        style={styles.input}
                        value={field.value}
                        onChangeText={field.setter}
                        keyboardType={field.keyboardType || "default"}
                        placeholder={field.label}
                      />
                    </View>
                  ))}

                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.cancelButtonText}>Отмена</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={handleSave}
                    >
                      <Text style={styles.saveButtonText}>Сохранить</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  addButton: {
    backgroundColor: "#008bd9",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  addressList: {
    marginTop: 20,
  },
  addressCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#008bd9",
  },
  addressText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  shopTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#555",
    marginBottom: 10,
  },
  phoneText: {
    fontSize: 17,
    color: "#008bd9",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 15,
  },
  editButton: {
    backgroundColor: "#ffb84d",
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
  },
  deleteButtonText: {
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#008bd9",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#008bd9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#008bd9",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  backButton: {
    marginBottom: 10,
  },
});

export default Address;
