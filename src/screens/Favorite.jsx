import React from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import Products from "../components/Products";
import { Ionicons } from "@expo/vector-icons";

const Favorite = () => {
  const savedItems = 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Избранное</Text>
        {savedItems > 0 ? (
          <Products />
        ) : (
          <Text style={styles.emptyText}>Нет сохранённых товаров</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    marginTop: 20,
    color: "#333",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    marginTop: 50,
  },
});

export default Favorite;
