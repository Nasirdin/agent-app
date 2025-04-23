import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "@env";
import axios from "axios";

const ForgotPassword = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [timer, setTimer] = useState(120);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerActive, timer]);

  const handleSubmitPhone = async () => {
    const cleanedNumber = phoneNumber.replace(/\s+/g, "").replace("+", "");

    if (!cleanedNumber.startsWith("996") || cleanedNumber.length < 12) {
      return setError(
        "Введите корректный номер телефона (например: +996700707070)"
      );
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/users/send-verification-code`, {
        phoneNumber: cleanedNumber,
      });

      Alert.alert("Код подтверждения отправлен");
      setIsTimerActive(true);
      setTimer(120);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCode = async (e) => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/users/verification-code`, {
        phoneNumber: phoneNumber.replace(/\s+/g, "").replace("+", ""),
        code: code,
      });
      Alert.alert("Код подтверждён, можно сменить пароль");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Неверный код");
    } finally {
      setLoading(false);
    }
  };

  const resendCode = () => {
    handleSubmitPhone();
  };

  const handlePasswordSubmit = async () => {
    if (newPassword.length < 8) {
      Alert.alert("Ошибка", "Пароль должен быть не менее 8 символов.");
      return;
    }

    try {
      await axios.post(`${API_URL}/users/reset-password`, {
        phoneNumber: phoneNumber.replace(/\s+/g, "").replace("+", ""),
        code: code,
        newPassword,
      });

      Alert.alert("Успех", "Пароль изменен успешно!");
      setStep(1);
      setPhoneNumber("");
      setCode("");
      setNewPassword("");
      setError("");
      navigation.replace("Login");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Произошла ошибка. Попробуйте еще раз.";
      Alert.alert("Ошибка", message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Забыли пароль?</Text>

          <View style={styles.content}>
            {step === 1 && (
              <>
                <Text style={styles.header}>Введите номер телефона</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Номер телефона"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleSubmitPhone()}
                >
                  <Text style={styles.buttonText}>
                    {loading ? "Отправка..." : "Отправить код"}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {step === 2 && (
              <>
                <Text style={styles.header}>Введите код из SMS</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Код из SMS"
                  keyboardType="number-pad"
                  value={code}
                  onChangeText={setCode}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleSubmitCode()}
                  disabled={loading || code.length < 4}
                >
                  <Text style={styles.buttonText}>
                    {loading ? "Отправка..." : "Подтвердить код"}
                  </Text>
                </TouchableOpacity>

                {timer === 0 ? (
                  <TouchableOpacity
                    style={styles.resendButton}
                    onPress={resendCode}
                  >
                    <Text style={styles.resendButtonText}>
                      Отправить код заново
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.timerText}>
                    Отправить повторный код через {timer} секунд
                  </Text>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <Text style={styles.header}>Введите новый пароль</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Новый пароль"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handlePasswordSubmit()}
                  disabled={loading || newPassword.length < 6}
                >
                  <Text style={styles.buttonText}>Сохранить новый пароль</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 70 : 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#008bd9",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  timerText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  resendButton: {
    marginTop: 10,
    alignItems: "center",
  },
  resendButtonText: {
    color: "#008bd9",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default ForgotPassword;
