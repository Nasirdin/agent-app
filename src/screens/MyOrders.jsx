import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MyOrders = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("active");

  const orders = [
    {
      id: "12345",
      date: "03.01.2025",
      sender: "Кола",
      amount: "1500 KGS",
      status: "В пути",
    },
    {
      id: "67890",
      date: "01.01.2025",
      sender: "Шоро",
      amount: "900 KGS",
      status: "Доставлено",
    },
  ];

  const filteredOrders =
    activeTab === "active"
      ? orders.filter((order) => order.status === "В пути")
      : orders.filter((order) => order.status === "Доставлено");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Заголовок */}
        <Text style={styles.title}>Мои заказы</Text>

        {/* Вкладки */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "active" && styles.activeTab]}
            onPress={() => setActiveTab("active")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "active" && styles.activeTabText,
              ]}
            >
              Активные
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "history" && styles.activeTab]}
            onPress={() => setActiveTab("history")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "history" && styles.activeTabText,
              ]}
            >
              История
            </Text>
          </TouchableOpacity>
        </View>

        {/* Карточки заказов */}
        <ScrollView style={styles.orders}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderInfo}>
                  <Ionicons name="cube-outline" size={40} color="#008bd9" />
                  <View style={styles.orderDetails}>
                    <Text style={styles.orderText}>
                      Отправитель: {order.sender}
                    </Text>
                    <Text style={styles.orderText}>Дата: {order.date}</Text>
                    <Text style={styles.orderText}>Код заказа: {order.id}</Text>
                    <Text style={styles.orderText}>Сумма: {order.amount}</Text>
                  </View>
                </View>
                <View style={styles.orderActions}>
                  <Text style={styles.status}>{order.status}</Text>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Смотреть</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="list" size={100} color="#999" />
              <Text style={styles.emptyText}>
                У вас нет завершенных заказов
              </Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate("Catalog")}
              >
                <Text style={styles.emptyButtonText}>Выбрать товары</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 150,
    backgroundColor: "#e0e0e0",
  },
  activeTab: {
    backgroundColor: "#008bd9",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "700",
  },
  orders: {
    flex: 1,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderDetails: {
    marginLeft: 15,
    flex: 1,
  },
  orderText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  orderActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  status: {
    fontSize: 14,
    color: "#008bd9",
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#008bd9",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: "#008bd9",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default MyOrders;
