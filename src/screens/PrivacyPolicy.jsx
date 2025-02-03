import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#008bd9" />
        </TouchableOpacity>
        <Text style={styles.title}>Политика конфиденциальности</Text>

        <Text style={styles.sectionTitle}>1. Сбор информации</Text>
        <Text style={styles.answer}>
          Мы собираем персональные данные, такие как имя, адрес электронной
          почты и номер телефона, чтобы предоставить вам доступ к нашим услугам.
        </Text>

        <Text style={styles.sectionTitle}>2. Использование информации</Text>
        <Text style={styles.answer}>
          Собранные данные используются для обработки ваших заказов, улучшения
          качества обслуживания и отправки уведомлений о новых продуктах и
          услугах.
        </Text>

        <Text style={styles.sectionTitle}>3. Защита данных</Text>
        <Text style={styles.answer}>
          Мы принимаем необходимые меры для защиты ваших персональных данных от
          несанкционированного доступа, изменения или уничтожения.
        </Text>

        <Text style={styles.sectionTitle}>4. Раскрытие информации</Text>
        <Text style={styles.answer}>
          Мы не передаем ваши персональные данные третьим лицам, за исключением
          случаев, предусмотренных законодательством.
        </Text>

        <Text style={styles.sectionTitle}>5. Ваши права</Text>
        <Text style={styles.answer}>
          Вы имеете право на доступ, исправление и удаление ваших персональных
          данных. Для этого свяжитесь с нами через раздел "Помощь" в приложении.
        </Text>

        <Text style={styles.sectionTitle}>6. Изменения в политике</Text>
        <Text style={styles.answer}>
          Мы можем периодически обновлять эту политику. Рекомендуем регулярно
          проверять эту страницу для получения актуальной информации.
        </Text>

        <Text style={styles.sectionTitle}>7. Контакты</Text>
        <Text style={styles.answer}>
          Если у вас есть вопросы или предложения по поводу нашей политики
          конфиденциальности, пожалуйста, свяжитесь с нами по адресу электронной
          почты: support@wholesaleapp.com.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#008bd9",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  answer: {
    fontSize: 16,
    marginBottom: 15,
  },
  backButton: {
    marginBottom: 10,
  },
});

export default PrivacyPolicyScreen;
