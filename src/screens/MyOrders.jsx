import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, selectOrder } from "../store/slices/userSlice";

const MyOrders = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("active");
  const { orders, user } = useSelector((state) => state.user);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    if (user && user._id) {
      dispatch(fetchOrders(user._id));
    }
    setRefreshing(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchOrders(user._id));
    }
  }, []);

  const filteredOrders =
    activeTab === "active"
      ? orders.filter((order) => order.status === "В пути")
      : orders.filter((order) => order.status === "Доставлено");

  function formattingDate(dateInput = new Date()) {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

    if (isNaN(date)) {
      throw new Error("Invalid date format");
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const selectActiveOrder = (order) => {
    dispatch(selectOrder(order));
    navigation.navigate("Order");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Мои заказы</Text>

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

        <ScrollView
          style={styles.orders}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <View key={order._id} style={styles.orderCard}>
                <View style={styles.orderInfo}>
                  <Ionicons name="cube-outline" size={40} color="#008bd9" />
                  <View style={styles.orderDetails}>
                    <Text style={styles.orderText}>
                      Отправитель: {order.owner.name}
                    </Text>
                    <Text style={styles.orderText}>
                      Дата: {formattingDate(order.createdAt)}
                    </Text>
                    <Text style={styles.orderText}>
                      Код заказа: {order.key}
                    </Text>
                    <Text style={styles.orderText}>Сумма: {order.amount}</Text>
                  </View>
                </View>
                <View style={styles.orderActions}>
                  <Text style={styles.status}>{order.status}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => selectActiveOrder(order)}
                  >
                    <Text style={styles.buttonText}>Смотреть</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                У вас нет завершенных заказов
              </Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate("AllProducts")}
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
    backgroundColor: "#fff",
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
