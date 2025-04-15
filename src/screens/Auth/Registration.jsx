import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Toast from "react-native-toast-message";
import { API_URL } from "@env";

const Login = ({ navigation }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  const handleInputChange = (name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    const formattedData = {
      ...data,
      phoneNumber: Number(data.phoneNumber),
    };

    if (formattedData.password !== formattedData.confirmPassword) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Пароли не совпадают",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        API_URL + "/users/",
        formattedData
      );
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during registration:", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Ошибка при регистрации",
        text2: "Пожалуйста, попробуйте еще раз.",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.login}>
      <View style={styles.loginContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#008bd9" />
        </TouchableOpacity>
        <Text style={styles.loginTitle}>Регистрация</Text>
        <Text style={styles.loginSubtitle}>Создайте учетную запись</Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Ваше имя"
          value={data.firstName}
          onChangeText={(text) => handleInputChange("firstName", text)}
        />
        <TextInput
          style={styles.loginInput}
          placeholder="Ваша фамилия"
          value={data.lastName}
          onChangeText={(text) => handleInputChange("lastName", text)}
        />
        <TextInput
          style={styles.loginInput}
          placeholder="Номер телефона"
          keyboardType="number-pad"
          value={data.phoneNumber}
          onChangeText={(text) => handleInputChange("phoneNumber", text)}
        />
        <TextInput
          style={styles.loginInput}
          placeholder="Пароль"
          secureTextEntry
          value={data.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        <TextInput
          style={styles.loginInput}
          placeholder="Подтвердить пароль"
          secureTextEntry
          value={data.confirmPassword}
          onChangeText={(text) => handleInputChange("confirmPassword", text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Зарегистрироваться</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>Уже есть аккаунт?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Войти</Text>
        </TouchableOpacity>

        <Text style={styles.loginInfoText}>
          Нажав кнопку Зарегистрироваться, вы соглашаетесь с нашими Условиями и
          Политикой в отношении данных.
        </Text>
      </View>

      {/* Toast уведомления */}
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    paddingTop: 100,
    padding: 15,
    backgroundColor: "#fff",
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 5,
  },
  loginSubtitle: {
    marginBottom: 20,
    fontSize: 17,
    color: "#999",
  },
  loginInput: {
    backgroundColor: "#f2f2f2",
    marginBottom: 15,
    padding: 15,
    fontSize: 17,
    borderRadius: 5,
  },
  loginButtonText: {
    backgroundColor: "#008BD9",
    marginTop: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 17,
    color: "#fff",
    fontWeight: "500",
  },
  loginText: {
    textAlign: "center",
    fontSize: 14,
  },
  loginLink: {
    textAlign: "center",
    color: "#008BD9",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
  },
  loginInfoText: {
    color: "#999",
    fontWeight: "500",
    paddingHorizontal: 30,
    textAlign: "center",
  },
});

export default Login;
