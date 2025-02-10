import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  RefreshControl,
  Modal,
} from "react-native";
import { fetchProducts } from "../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Products from "../components/Products";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { fetchCategories } from "../store/slices/categorySlice";
import Filter from "../components/Filter"; // Импорт компонента фильтра

const AllProducts = ({ navigation }) => {
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryList = Array.isArray(categories) ? categories : [];

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    setRefreshing(false);
  };

  const filterProducts = useCallback(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchText]);

  useEffect(() => {
    filterProducts();
  }, [searchText, filterProducts]);

  const applyFilter = (filters) => {
    const { selectedCategory, minPrice, maxPrice } = filters;
    let filtered = products.filter((product) => {
      return (
        (selectedCategory ? product.categoryId === selectedCategory : true) &&
        product.price >= minPrice &&
        product.price <= maxPrice
      );
    });
    setFilteredProducts(filtered);
    setFilterVisible(false);
  };

  const toggleFilter = () => setFilterVisible(!filterVisible);

  return (
    <SafeAreaView style={styles.container}>
      {/* Заголовок с поиском и кнопкой фильтра */}
      <View style={styles.header}>
        <TextInput
          style={styles.productsSearch}
          placeholder="Поиск"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.filter} onPress={toggleFilter}>
          <Ionicons name="filter" size={24} color={"#008bd9"} />
        </TouchableOpacity>
      </View>

      

      {/* Modal для отображения фильтра в полноэкранном режиме */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={filterVisible}
        onRequestClose={() => setFilterVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Компонент фильтра */}
          <Filter categories={categories} onApplyFilter={applyFilter} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setFilterVisible(false)}
          >
            <Text style={styles.closeButtonText}>Закрыть фильтры</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* Список категорий */}
      <View style={styles.categories}>
        <View style={styles.categoriesBlock}>
          <Text style={styles.categoryTitle}>Категории</Text>
          <TouchableOpacity style={styles.categoryBtn}>
            <Text>Смотреть все</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={"#008bd9"}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categoryList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.category}
              onPress={() => dispatch(fetchProducts(item._id))}
            >
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Список продуктов */}
      <ScrollView
        contentContainerStyle={styles.products}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Products
          navigation={navigation}
          products={filteredProducts.length > 0 ? filteredProducts : products}
        />
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
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productsSearch: {
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    width: "88%",
    backgroundColor: "#e5e5e5",
  },
  filter: {
    marginRight: 10,
  },
  categories: {
    paddingHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  categoriesBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  category: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#008bd930",
  },
  categoryText: {
    fontSize: 18,
  },
  products: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#008bd9",
    borderRadius: 5,
    margin: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AllProducts;
