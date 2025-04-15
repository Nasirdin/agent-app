import React, { useMemo } from "react";
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

const formatDate = (dateInput) => {
  const date = new Date(dateInput);
  return isNaN(date)
    ? "-"
    : `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${date.getFullYear()}`;
};

const ProductCard = ({ product }) => (
  <View style={styles.productCard}>
    {product?.product?.images?.[0] && (
      <Image
        source={{ uri: product.product.images[0] }}
        style={styles.productImage}
      />
    )}
    <View>
      <Text style={styles.productName}>
        {product?.product?.name || "Без названия"}
      </Text>
      <InfoRow label="Цена" value={`${product?.product?.price || 0} сом`} />
      <InfoRow label="Кол-во" value={`${product?.quantity}`} />
    </View>
  </View>
);

const Order = ({ navigation }) => {
  const activeOrder = useSelector((state) => state.order.activeOrder);

  const orderDetails = useMemo(() => {
    if (!activeOrder) return null;
    return {
      status: activeOrder.status,
      key: activeOrder.key,
      amount: activeOrder.amount,
      supplier: activeOrder.owner?.companyName || "Неизвестный поставщик",
      createdAt: formatDate(activeOrder.createdAt),
      products: activeOrder.products || [],
    };
  }, [activeOrder]);

  if (!orderDetails) return null;

  const statusMapping = {
    new: "Новый",
    processing: "В обработке",
    shipped: "Отправлен",
    closed: "Закрыт",
    canceled: "Отменён",
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#008bd9" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{orderDetails.key}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.orderInfo}>
          <Text style={styles.status}>
            {" "}
            {statusMapping[orderDetails.status] || "Неизвестный статус"}
          </Text>
          <InfoRow label="Код заказа" value={orderDetails.key} />
          <InfoRow label="Сумма" value={`${orderDetails.amount} сом`} />
          <InfoRow label="Поставщик" value={orderDetails.supplier} />
          <InfoRow label="Дата заказа" value={orderDetails.createdAt} />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View>
          {orderDetails.products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}: </Text>
    <Text style={styles.value}>{value}</Text>
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
  content: { padding: 10 },
  orderInfo: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 6,
    marginRight: 15,
  },
  productName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#008bd9",
    marginBottom: 5,
  },
  productInfo: {
    marginTop: 5,
    alignItems: "center",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#161616",
  },
});

export default Order;
