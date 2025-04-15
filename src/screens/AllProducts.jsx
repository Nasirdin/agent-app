import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import Products from "../components/Products";

const AllProducts = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products) || [];

  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const limit = 10;

  const loadProducts = useCallback(
    async (reset = false) => {
      if (loadingMore) return;

      const newOffset = reset ? 0 : offset + limit;
      setLoadingMore(true);

      try {
        await dispatch(
          fetchProducts({
            searchText,
            limit,
            offset: newOffset,
            random: false,
            sortBy: "createdAt",
            order: "DESC",
          })
        ).unwrap();
        setOffset(reset ? 0 : newOffset);
      } finally {
        setLoadingMore(false);
      }
    },
    [dispatch, searchText, offset, loadingMore]
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts(true);
    setRefreshing(false);
  };

  useEffect(() => {
    loadProducts(true);
  }, [searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.productsSearch}
          placeholder="Поиск товаров..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <ScrollView
        style={styles.productContent}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Products navigation={navigation} products={products} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  productsSearch: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: "#008bd9",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  productContent: {
    paddingHorizontal: 15,
  },
});

export default AllProducts;
