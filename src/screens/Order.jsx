import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

// Функция для форматирования даты
function formatDate(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date)) return "-"; // Возвращаем дефолтный формат, если дата некорректна

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

// Компонент для отображения информации о товаре
const ProductCard = ({ product }) => (
  <View style={styles.productCard}>
    {product.images && product.images[0] && (
      <Image source={{ uri: product.images[0] }} style={styles.productImage} />
    )}
    <Text style={styles.productName}>{product.name}</Text>
    <Text>Количество: {product.minAmount}</Text>
  </View>
);

const Order = ({ navigation }) => {
  const selectedOrder = useSelector((state) => state.user.selectedOrder);

  if (!selectedOrder) return null;

  return (
    <SafeAreaView style={styles.container}>
      {/* Шапка */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#008bd9" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedOrder.key}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Информация о заказе */}
        <View style={styles.orderInfo}>
          <Text style={styles.status}>{selectedOrder.status}</Text>
          <InfoRow label="Код товара" value={selectedOrder.key} />
          <InfoRow label="Сумма" value={`${selectedOrder.amount} сом`} />
          <InfoRow label="Поставщик" value={selectedOrder.owner.name} isLink />
          <InfoRow
            label="Дата заказа"
            value={formatDate(selectedOrder.createdAt)}
          />
        </View>

        {/* Сетка товаров */}
        <View style={styles.grid}>
          {selectedOrder.products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Компонент для отображения строки информации
const InfoRow = ({ label, value, isLink }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}: </Text>
    {isLink ? (
      <Text style={styles.link}>{value}</Text>
    ) : (
      <Text style={styles.value}>{value}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  headerTitle: {
    color: "#008bd9",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 15,
  },
  content: { padding: 20 },
  orderInfo: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  label: { fontSize: 16, color: "#333", fontWeight: "600" },
  value: { fontSize: 16, color: "#008bd9", fontWeight: "600" },
  status: {
    fontSize: 18,
    color: "#777",
    fontWeight: "700",
    marginBottom: 10,
    marginLeft: "auto",
  },
  link: { fontSize: 16, color: "#008bd9", fontWeight: "700" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: 120,
    height: 180,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
    color: "#008bd9",
  },
});

export default Order;
