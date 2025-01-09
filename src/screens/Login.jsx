import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
// ---- Components ---- //

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.login}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Вход в систему</Text>
        <Text style={styles.loginSubtitle}>Введите свой логин и пароль</Text>
        <TextInput style={styles.loginInput} placeholder="Номер телефона" />
        <TextInput
          style={styles.loginInput}
          placeholder="Пароль"
          secureTextEntry
        />
        <TouchableOpacity>
          <Text style={styles.loginForgotPassword}>Забыли пароль?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Main")}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Войти</Text>
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
    fontWeight: 500,
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
    fontWeight: 500,
  },
  loginText: {
    textAlign: "center",
    fontSize: 14,
  },
  loginLink: {
    textAlign: "center",
    color: "#008BD9",
    fontSize: 16,
    fontWeight: 500,
  },
});

export default Login;
