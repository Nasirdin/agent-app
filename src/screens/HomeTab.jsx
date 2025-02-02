import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ---- Components ---- //
import Home from "./Home";
import AllProduct from "./AllProducts";
import Favorite from "./Favorite";
import MyOrders from "./MyOrders";
import Cart from "./Cart";

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route, color, size) => {
  const icons = {
    Home: "home",
    Product: "list",
    Favorite: "heart",
    Cart: "cart",
    MyOrders: "receipt",
  };

  return <Ionicons name={icons[route.name]} size={size} color={color} />;
};

// Массив экранов
const screens = [
  { name: "Home", component: Home, label: "Главная" },
  { name: "AllProduct", component: AllProduct, label: "Товары" },
  { name: "Favorite", component: Favorite, label: "Избранное" },
  { name: "Cart", component: Cart, label: "Корзина" },
  { name: "MyOrders", component: MyOrders, label: "Заказы" },
];

export default function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#008bd9",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          height: Platform.OS === "android" ? 60 : 90,
          paddingTop: 5,
          paddingHorizontal: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          textAlign: "center",
        },
        headerShown: false,
        tabBarIcon: ({ color, size }) => getTabBarIcon(route, color, size),
      })}
    >
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{ tabBarLabel: screen.label }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
});
