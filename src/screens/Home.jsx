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
import Discount from "../components/Discount";
import News from "../components/News";
import HomeHeader from "../components/HomeHeader";
import BestOffers from "../components/BestOffers";
import Products from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../helpers";
import axios from "axios";
import { setUserData } from "../store/slices/userSlice";
import { API_URL } from "@env";
import { fetchProducts } from "../store/slices/productSlice";

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const fetchUserData = async () => {
    const token = await getToken();
    if (!token) {
      return;
    }
    const response = await axios.get(API_URL + `/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      return;
    }
    const data = response.data;
    dispatch(setUserData(data));
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserData();
    dispatch(fetchProducts());
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUserData();
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
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
            onPress={() => navigation.navigate("AllProducts")}
          >
            <Ionicons name="grid" size={35} color="white" />
            <Text style={styles.buttonText}>Каталог товаров</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.orangeButton]}
            onPress={() => navigation.navigate("MyOrders")}
          >
            <Ionicons name="time" size={35} color="white" />
            <Text style={styles.buttonText}>Мои заказы</Text>
          </TouchableOpacity>
        </View>
        {/* <Discount /> */}
        {/* <BestOffers /> */}
        <Text style={styles.title}>Новинки</Text>
        <Products navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
