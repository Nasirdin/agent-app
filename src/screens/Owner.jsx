import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Products from "../components/Products";

const Owner = ({ navigation }) => {
  const { owner } = useSelector((state) => state.owner);

  if (!owner) return null;

  const { phoneNumber, companyName, logo, products = [] } = owner;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              {logo ? (
                <Image source={{ uri: logo }} style={styles.avatar} />
              ) : (
                <Ionicons name="business-outline" size={60} color="#008bd9" />
              )}
            </View>
            <Text style={styles.companyName}>{companyName}</Text>

            {phoneNumber && (
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
                style={styles.phoneContainer}
              >
                <Ionicons name="call-outline" size={18} color="#fff" />
                <Text style={styles.phoneText}>{phoneNumber}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Products Section */}
        <View style={styles.productsSection}>
          <Text style={styles.productsTitle}>Продукты компании</Text>
          <Products products={products} navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#008bd9",
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 30,
  },
  headerContent: {
    alignItems: "center",
  },
  logoContainer: {
    backgroundColor: "#fff",
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  companyName: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  phoneText: {
    fontSize: 16,
    color: "#fff",
  },
  productsSection: {
    padding: 10,
  },
  productsTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },
});

export default Owner;
