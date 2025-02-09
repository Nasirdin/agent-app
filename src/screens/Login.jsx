import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { saveTokens } from "../helpers";
import { API_URL } from "@env";

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все поля");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(API_URL + `/users/login`, {
        phoneNumber,
        password,
      });
      
      const { accessToken, refreshToken } = response.data;
      saveTokens(accessToken, refreshToken);
      navigation.navigate("Main");
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        console.error("Response error:", error.response);
        if (error.response.data && error.response.data.message) {
          Alert.alert("Ошибка", error.response.data.message);
        } else {
          Alert.alert(
            "Ошибка",
            "Не удалось выполнить вход. Ответ от сервера пуст."
          );
        }
      } else if (error.request) {
        console.error("Request error:", error.request);
        Alert.alert("Ошибка", "Ошибка сети. Проверьте подключение.");
      } else {
        console.error("Unexpected error:", error.message);
        Alert.alert("Ошибка", "Не удалось выполнить вход. Попробуйте позже.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.login}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Вход в систему</Text>
        <Text style={styles.loginSubtitle}>Введите свой логин и пароль</Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Номер телефона"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.loginInput}
          placeholder="Пароль"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity>
          <Text style={styles.loginForgotPassword}>Забыли пароль?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? "Загрузка..." : "Войти"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>У вас нет учетной записи?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
          <Text style={styles.loginLink}>Регистрация</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    paddingTop: 200,
    padding: 15,
    backgroundColor: "#fff",
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 5,
  },
  loginSubtitle: {
    marginBottom: 25,
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
  loginForgotPassword: {
    color: "#008BD9",
    marginBottom: 15,
    fontSize: 16,
  },
  loginButtonText: {
    backgroundColor: "#008BD9",
    marginTop: 15,
    marginBottom: 20,
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
  },
});

export default Login;
