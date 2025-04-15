import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// ---- Components ---- //
import Home from "./Home";
import MyOrders from "./MyOrders";
import Cart from "./Cart";
import Catalog from "./Catalog";
import AllProducts from "./AllProducts";

const Tab = createBottomTabNavigator();
import { Ionicons } from "@expo/vector-icons";

// Массив экранов с иконками
const screens = [
  { name: "Home", component: Home, label: "Главная", icon: "home" },
  { name: "Catalog", component: Catalog, label: "Каталог", icon: "grid" },
  { name: "Products", component: AllProducts, label: "Продукты", icon: "list" },
  { name: "Cart", component: Cart, label: "Корзина", icon: "cart" },
  {
    name: "MyOrders",
    component: MyOrders,
    label: "Заказы",
    icon: "cube",
  },
];

export default function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const screen = screens.find((s) => s.name === route.name);
        return {
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={screen?.icon}
              size={size}
              color={color}
            />
          ),
        };
      }}
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
