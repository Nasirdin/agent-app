import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "@env";
import News from "../components/News";
import HomeHeader from "../components/HomeHeader";
import Products from "../components/Products";
import { checkAndRefreshToken, getToken } from "../helpers";
import { setUserData } from "../store/slices/userSlice";
import { fetchProducts } from "../store/slices/productSlice";

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const products = useSelector((state) => state.product.products) || [];

  const dispatch = useDispatch();

  const fetchUserData = async () => {
    await checkAndRefreshToken();
    const token = await getToken();
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        dispatch(setUserData(response.data));
      }
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    dispatch(
      fetchProducts({
        searchText: "",
        limit: 25,
        offset: 0,
        random: false,
        sortBy: "createdAt",
        order: "DESC",
      })
    );
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUserData();
    dispatch(
      fetchProducts({
        searchText: "",
        limit: 25,
        offset: 0,
        random: false,
        sortBy: "createdAt",
        order: "DESC",
      })
    );
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <HomeHeader navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <News />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.blueButton]}
            onPress={() => navigation.navigate("Favorite")}
          >
            <Ionicons name="heart" size={35} color="white" />
            <Text style={styles.buttonText}>Любимые товары</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.orangeButton]}
            onPress={() => navigation.navigate("MyOrders")}
          >
            <Ionicons name="time" size={35} color="white" />
            <Text style={styles.buttonText}>Мои заказы</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Новинки</Text>
        <Products navigation={navigation} products={products} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 5 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
  },
  blueButton: {
    backgroundColor: "#008bd9",
  },
  orangeButton: {
    backgroundColor: "#FF7F32",
  },
  buttonText: {
    marginTop: 5,
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 10,
  },
});

export default Home;
