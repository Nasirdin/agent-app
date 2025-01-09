import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Discount from "../components/Discount";
import News from "../components/News";
import HomeHeader from "../components/HomeHeader";
import BestOffers from "../components/BestOffers";
import Products from "../components/Products";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <News />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.blueButton]}
            onPress={() => navigation.navigate("Catalog")}
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
        <Discount />
        <BestOffers />
        <Text style={styles.title}>Новинки</Text>
        <Products navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
