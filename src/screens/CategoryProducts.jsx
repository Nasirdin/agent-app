import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../store/slices/productSlice";
import Products from "../components/Products";

const CategoryProducts = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const dispatch = useDispatch();
  const { categoryProducts, loading, error } = useSelector(
    (state) => state.product
  );
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchProductsByCategory({ categoryId, searchText }));
  }, [dispatch, categoryId, searchText]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск товаров..."
            value={searchText}
            onChangeText={setSearchText}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#008bd9" />
          ) : error ? (
            <Text style={styles.errorText}>Ошибка загрузки</Text>
          ) : categoryProducts.length === 0 ? (
            <Text style={styles.emptyText}>Нет товаров</Text>
          ) : (
            <ScrollView keyboardShouldPersistTaps="handled">
              <Products navigation={navigation} products={categoryProducts} />
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 15,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});

export default CategoryProducts;
