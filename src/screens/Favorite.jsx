import React, { useEffect, useCallback, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Products from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteProducts } from "../store/slices/productSlice";
import { Ionicons } from "@expo/vector-icons";

const Favorite = ({ navigation }) => {
  const dispatch = useDispatch();
  const { favoriteProducts } = useSelector((state) => state.product);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavorites = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchFavoriteProducts());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Фиксированный header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#008bd9" />
        </TouchableOpacity>
        <Text style={styles.title}>Избранное</Text>
        <View></View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadFavorites} />
        }
      >
        {favoriteProducts.length > 0 ? (
          <Products navigation={navigation} products={favoriteProducts} />
        ) : (
          <Text style={styles.emptyText}>Нет сохранённых товаров</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    marginTop: 50,
  },
});

export default Favorite;
