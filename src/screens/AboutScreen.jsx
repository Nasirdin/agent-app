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

const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#008bd9" />
        </TouchableOpacity>
        <Text style={styles.title}>О приложении</Text>

        <Text style={styles.sectionTitle}>Общие вопросы</Text>
        <Text style={styles.question}>Что это за приложение?</Text>
        <Text style={styles.answer}>
          Наше приложение позволяет магазинам заказывать товары оптом напрямую у
          производителей или официальных представителей. Оно упрощает процесс
          оптовых закупок.
        </Text>

        <Text style={styles.question}>
          Кто может пользоваться этим приложением?
        </Text>
        <Text style={styles.answer}>
          Приложение предназначено для владельцев и менеджеров магазинов,
          которые хотят закупать товары оптом у проверенных поставщиков.
        </Text>

        <Text style={styles.sectionTitle}>Регистрация и вход</Text>
        <Text style={styles.question}>
          Как зарегистрироваться в приложении?
        </Text>
        <Text style={styles.answer}>
          Скачайте приложение из App Store или Google Play. Нажмите на кнопку
          "Регистрация". Заполните форму с данными вашего магазина и контактной
          информацией. Подтвердите номер телефона через SMS-код.
        </Text>

        <Text style={styles.question}>Что делать, если я забыл пароль?</Text>
        <Text style={styles.answer}>
          На странице входа нажмите на ссылку "Забыли пароль?", введите номер
          телефона или email, и следуйте инструкциям для восстановления пароля.
        </Text>

        <Text style={styles.sectionTitle}>Как оформить заказ?</Text>
        <Text style={styles.question}>Как найти нужные товары?</Text>
        <Text style={styles.answer}>
          Вы можете искать товары по категориям или использовать строку поиска
          для быстрого нахождения необходимого продукта.
        </Text>

        <Text style={styles.question}>Как оформить заказ?</Text>
        <Text style={styles.answer}>
          Добавьте товары в корзину. Перейдите в корзину и проверьте выбранные
          товары. Нажмите "Оформить заказ". Укажите адрес доставки и подтвердите
          заказ.
        </Text>

        <Text style={styles.question}>Когда мой заказ будет доставлен?</Text>
        <Text style={styles.answer}>
          Доставка осуществляется в течение 2-3 дней после оформления заказа.
          Курьер от поставщика привезет ваш заказ вместе с накладной.
        </Text>

        <Text style={styles.sectionTitle}>Оплата и документы</Text>
        <Text style={styles.question}>Какие способы оплаты доступны?</Text>
        <Text style={styles.answer}>
          На данный момент доступна оплата по накладной. Курьер привезет
          накладную вместе с товаром, и вы сможете оплатить товар по
          договоренности с поставщиком.
        </Text>

        <Text style={styles.question}>
          Можно ли получить электронную накладную?
        </Text>
        <Text style={styles.answer}>
          Да, после оформления заказа вы получите электронную накладную в
          приложении. Также курьер привезет бумажную версию накладной.
        </Text>

        <Text style={styles.sectionTitle}>Поставщики и товары</Text>
        <Text style={styles.question}>
          Кто может размещать товары в приложении?
        </Text>
        <Text style={styles.answer}>
          Только проверенные поставщики и официальные представители
          производителей могут размещать свои товары в приложении.
        </Text>

        <Text style={styles.question}>Как гарантируется качество товаров?</Text>
        <Text style={styles.answer}>
          Мы сотрудничаем только с проверенными поставщиками, которые
          гарантируют качество продукции. В случае проблем с товаром вы можете
          связаться с поставщиком через приложение.
        </Text>

        <Text style={styles.sectionTitle}>Доставка</Text>
        <Text style={styles.question}>Кто занимается доставкой товаров?</Text>
        <Text style={styles.answer}>
          Доставку осуществляют курьеры поставщика. Они доставляют заказ в ваш
          магазин вместе с накладной.
        </Text>

        <Text style={styles.question}>Как отследить статус заказа?</Text>
        <Text style={styles.answer}>
          Вы можете отслеживать статус заказа в разделе "Мои заказы". После
          подтверждения заказа поставщик обновит статус доставки.
        </Text>

        <Text style={styles.sectionTitle}>Технические вопросы</Text>
        <Text style={styles.question}>
          Что делать, если приложение не работает?
        </Text>
        <Text style={styles.answer}>
          Проверьте подключение к интернету. Перезагрузите приложение. Если
          проблема не решена, свяжитесь с технической поддержкой через раздел
          "Помощь" в приложении.
        </Text>

        <Text style={styles.question}>Как связаться с поддержкой?</Text>
        <Text style={styles.answer}>
          Вы можете написать в чат поддержки в приложении или отправить письмо
          на наш email: support@wholesaleapp.com.
        </Text>

        <Text style={styles.sectionTitle}>
          Безопасность и конфиденциальность
        </Text>
        <Text style={styles.question}>Безопасны ли мои данные?</Text>
        <Text style={styles.answer}>
          Мы обеспечиваем высокий уровень безопасности ваших данных. Вся
          информация шифруется и не передается третьим лицам без вашего
          согласия.
        </Text>

        <Text style={styles.question}>Могу ли я удалить свой аккаунт?</Text>
        <Text style={styles.answer}>
          Да, вы можете удалить свой аккаунт в любое время через настройки
          профиля. После удаления все ваши данные будут безвозвратно удалены.
        </Text>

        <Text style={styles.sectionTitle}>
          Преимущества использования приложения
        </Text>
        <Text style={styles.bulletPoint}>
          • Доступ к проверенным поставщикам и прямым производителям.
        </Text>
        <Text style={styles.bulletPoint}>
          • Быстрый и удобный процесс оформления заказа.
        </Text>
        <Text style={styles.bulletPoint}>• Доставка в течение 2-3 дней.</Text>
        <Text style={styles.bulletPoint}>
          • Получение всех необходимых документов (накладные).
        </Text>
        <Text style={styles.bulletPoint}>
          • Общение с поставщиками напрямую через приложение.
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
    fontWeight: 700,
    color: "#008bd9",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginTop: 16,
    marginBottom: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: 700,
    marginTop: 8,
    color: "#008bd9",
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

export default AboutScreen;
