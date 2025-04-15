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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchShops } from "../../store/slices/shopSlice";
import { getToken } from "../../helpers";

const Address = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAddressIndex, setCurrentAddressIndex] = useState(null);
  const [formData, setFormData] = useState({
    region: "",
    district: "",
    street: "",
    shopNumber: "",
    shopName: "",
    shopPhoneNumber: "",
  });

  const { shops } = useSelector((state) => state.shop);

  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  const handleSave = async () => {
    const { region, district, street, shopNumber, shopName, shopPhoneNumber } =
      formData;

    if (
      !region ||
      !district ||
      !street ||
      !shopNumber ||
      !shopName ||
      !shopPhoneNumber
    ) {
      Alert.alert("Ошибка", "Заполните все обязательные поля");
      return;
    }

    try {
      const token = await getToken();
      let response;

      if (isEditMode && currentAddressIndex !== null) {
        const addressId = shops[currentAddressIndex].id;
        response = await axios.patch(
          `${API_URL}/shops/${addressId}`,
          { ...formData },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        response = await axios.post(
          `${API_URL}/shops`,
          { ...formData },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      resetForm();
      setModalVisible(false);
      Alert.alert(
        "Успешно",
        isEditMode ? "Адрес обновлен!" : "Адрес сохранен!"
      );
      resetForm();
      dispatch(fetchShops());
    } catch (error) {
      console.error("Ошибка при сохранении адреса", error);
      Alert.alert("Ошибка", "Не удалось сохранить адрес");
    }
  };

  const handleDelete = (index) => {
    Alert.alert(
      "Удалить адрес?",
      "Вы уверены, что хотите удалить этот адрес?",
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Удалить",
          onPress: () => {
            const addressId = shops[index].id;
            deleteAddress(addressId);
          },
        },
      ]
    );
  };

  const deleteAddress = async (addressId) => {
    try {
      const token = await getToken();
      await axios.delete(`${API_URL}/shops/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert("Успешно", "Адрес удален!");
      dispatch(fetchShops());
    } catch (error) {
      console.error("Ошибка при удалении адреса", error);
      Alert.alert("Ошибка", "Не удалось удалить адрес");
    }
  };

  const handleEdit = (index) => {
    const addressToEdit = shops[index];
    setFormData({
      region: addressToEdit.region,
      district: addressToEdit.district,
      street: addressToEdit.street,
      shopNumber: addressToEdit.shopNumber,
      shopName: addressToEdit.shopName,
      shopPhoneNumber: addressToEdit.shopPhoneNumber,
    });
    setIsEditMode(true);
    setCurrentAddressIndex(index);
    setModalVisible(true);
  };

  const resetForm = () => {
    setFormData({
      region: "",
      district: "",
      street: "",
      shopNumber: "",
      shopName: "",
      shopPhoneNumber: "",
    });
    setIsEditMode(false);
    setCurrentAddressIndex(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#008bd9" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Адреса доставки</Text>

        <ScrollView style={styles.addressList}>
          {Array.isArray(shops) && shops.length > 0 ? (
            shops.map((address, index) => (
              <View key={index} style={styles.addressCard}>
                <Text style={styles.shopTitle}>
                  Магазин: {address.shopName}
                </Text>
                <Text style={styles.addressText}>
                  {address.region}, {address.district}, {address.street}{" "}
                  {address.shopNumber}
                </Text>
                <Text style={styles.phoneText}>
                  Телефон: {address.shopPhoneNumber}
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
            ))
          ) : (
            <Text style={styles.noAddresses}>Нет доступных адресов</Text>
          )}

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
                    {
                      label: "Область",
                      value: formData.region,
                      setter: (value) =>
                        setFormData({ ...formData, region: value }),
                    },
                    {
                      label: "Район",
                      value: formData.district,
                      setter: (value) =>
                        setFormData({ ...formData, district: value }),
                    },
                    {
                      label: "Улица",
                      value: formData.street,
                      setter: (value) =>
                        setFormData({ ...formData, street: value }),
                    },
                    {
                      label: "Номер дома",
                      value: formData.shopNumber,
                      setter: (value) =>
                        setFormData({ ...formData, shopNumber: value }),
                    },
                    {
                      label: "Название магазина",
                      value: formData.shopName,
                      setter: (value) =>
                        setFormData({ ...formData, shopName: value }),
                    },
                    {
                      label: "Номер продавца",
                      value: formData.shopPhoneNumber,
                      setter: (value) =>
                        setFormData({ ...formData, shopPhoneNumber: value }),
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
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25,
    marginTop: -25,
    color: "#333",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#008bd9",
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
  },
  noAddresses: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginVertical: 20,
  },
  backButton: {
    marginTop: 10,
    zIndex: 999,
  },
});

export default Address;
