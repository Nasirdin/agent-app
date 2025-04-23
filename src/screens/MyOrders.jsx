import React, { useState, useCallback, useEffect, useMemo } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { fetchOrders, setActiveOrder } from "../store/slices/orderSlice";

const MyOrders = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("new");
  const { orders } = useSelector((state) => state.order);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const statusMapping = {
    new: "Новый",
    processing: "В обработке",
    shipped: "Отправлен",
    closed: "Закрыт",
    canceled: "Отменён",
  };

  const fetchOrderData = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchOrders({ status: activeTab })).finally(() =>
      setRefreshing(false)
    );
  }, [dispatch, activeTab]);

  useFocusEffect(
    useCallback(() => {
      fetchOrderData();
    }, [fetchOrderData])
  );

  const formattingDate = (dateInput) => {
    const date = new Date(dateInput);
    if (isNaN(date)) return "Неизвестная дата";
    return date.toLocaleDateString("ru-RU");
  };

  const selectActiveOrder = (order) => {
    dispatch(setActiveOrder(order));
    navigation.navigate("Order");
  };
  useEffect(() => {
    fetchOrderData();
  }, [activeTab]);

  const tabs = useMemo(
    () => [
      { key: "new", label: "Активные" },
      { key: "shipped", label: "Отправлено" },
      { key: "closed", label: "История" },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Мои заказы</Text>

        <View style={styles.tabs}>
          {tabs.map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              style={[styles.tab, activeTab === key && styles.activeTab]}
              onPress={() => setActiveTab(key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === key && styles.activeTabText,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          style={styles.orders}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchOrderData}
            />
          }
        >
          {orders.length > 0 ? (
            orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderInfo}>
                  <Ionicons name="cube-outline" size={40} color="#008bd9" />
                  <View style={styles.orderDetails}>
                    <Text style={styles.orderAmount}>
                      Сумма: {order.amount}
                    </Text>
                    <Text style={styles.orderText}>
                      Отправитель: {order.owner.companyName}
                    </Text>
                    <Text style={styles.orderText}>
                      Дата: {formattingDate(order.createdAt)}
                    </Text>
                    <Text style={styles.orderText}>
                      Код заказа: {order.key}
                    </Text>
                  </View>
                </View>
                <View style={styles.orderActions}>
                  <Text style={styles.status}>
                    {statusMapping[order.status] || "Неизвестный статус"}
                  </Text>
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
                У вас нет заказов в этой категории
              </Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate("Products")}
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
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: "auto",
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
  orderAmount: {
    fontSize: 18,
    color: "#008bd9",
    fontWeight: 500,
    marginBottom: 5,
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
    fontSize: 16,
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
    fontSize: 16,
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
