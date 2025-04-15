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

const TermsAndConditionsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#008bd9" />
        </TouchableOpacity>
        <Text style={styles.title}>Правила и положения</Text>

        <Text style={styles.sectionTitle}>1. Общие положения</Text>
        <Text style={styles.answer}>
          Это приложение предназначено для владельцев магазинов, которые хотят
          закупать товары напрямую у оптовых поставщиков.
        </Text>
        <Text style={styles.answer}>
          Использование приложения подразумевает согласие с данными правилами и
          положениями.
        </Text>

        <Text style={styles.sectionTitle}>2. Доставка товаров</Text>
        <Text style={styles.answer}>
          Доставка осуществляется в течение 2-4 дней после оформления заказа.
        </Text>
        <Text style={styles.answer}>
          Товар доставляется курьером от поставщика вместе с накладной.
        </Text>

        <Text style={styles.sectionTitle}>3. Оплата</Text>
        <Text style={styles.answer}>
          Оплата производится по накладной при получении заказа, либо по
          договоренности с поставщиком.
        </Text>
        <Text style={styles.answer}>
          В будущем могут быть добавлены дополнительные способы оплаты.
        </Text>

        <Text style={styles.sectionTitle}>4. Ответственность</Text>
        <Text style={styles.answer}>
          Поставщики несут ответственность за качество и соответствие товара.
        </Text>
        <Text style={styles.answer}>
          Администрация приложения не несет ответственности за несоответствие
          товаров, но предоставляет возможность связи с поставщиком.
        </Text>

        <Text style={styles.sectionTitle}>5. Пользовательские данные</Text>
        <Text style={styles.answer}>
          Все данные пользователей защищены и не передаются третьим лицам без
          согласия пользователя.
        </Text>
        <Text style={styles.answer}>
          Пользователь может запросить удаление своего аккаунта и данных в любое
          время.
        </Text>

        <Text style={styles.sectionTitle}>6. Заключительные положения</Text>
        <Text style={styles.answer}>
          Администрация приложения оставляет за собой право изменять данные
          правила и положения.
        </Text>
        <Text style={styles.answer}>
          Обновленные правила вступают в силу с момента их публикации в
          приложении.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#008bd9",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 5,
  },
  answer: {
    fontSize: 18,
    marginTop: 4,
    marginBottom: 10,
    color: "#333",
  },
  backButton: {
    marginBottom: 10,
  },
});

export default TermsAndConditionsScreen;
