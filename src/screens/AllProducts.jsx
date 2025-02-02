import React, { useEffect, useState } from "react";
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
} from "react-native";
import { fetchProducts } from "../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Products from "../components/Products";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { fetchCategories } from "../store/slices/categorySlice";

const AllProduct = ({ navigation }) => {
  const categories = useSelector((state) => state.category.categories);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  const categoryList = Array.isArray(categories) ? categories : [];
  const generateRandomColor = () => {
    // Генерация случайного оттенка (hue) от 0 до 360
    const hue = Math.floor(Math.random() * 360);
    // Устанавливаем насыщенность и яркость, чтобы избежать серых и черных оттенков
    const saturation = Math.floor(Math.random() * 50) + 50; // от 50% до 100%
    const lightness = Math.floor(Math.random() * 50) + 25; // от 25% до 75%

    const c = ((1 - Math.abs((2 * lightness) / 100 - 1)) * saturation) / 100;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = lightness / 100 - c / 2;

    let r = 0,
      g = 0,
      b = 0;

    if (hue >= 0 && hue < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (hue >= 60 && hue < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (hue >= 120 && hue < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (hue >= 180 && hue < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (hue >= 240 && hue < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (hue >= 300 && hue < 360) {
      r = c;
      g = 0;
      b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    // Преобразование RGB в HEX
    const rgb = (r << 16) | (g << 8) | b;
    const hex = `#${(0x1000000 | rgb).toString(16).slice(1)}`;

    // Добавление 50% прозрачности
    return `${hex}20`; // '80' — это 50% прозрачности в HEX
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    setRefreshing(false);
  };

  const clickCategory = (categoryId) => {
    dispatch(fetchProducts(categoryId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.productsSearch}
          placeholder="Поиск"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.filter}>
          <Ionicons name="filter" size={24} color={"#008bd9"} />
        </TouchableOpacity>
      </View>

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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.category,
                { backgroundColor: generateRandomColor() },
              ]}
              onPress={() => clickCategory(item._id)}
            >
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categories}
          ListEmptyComponent={<Text style={styles.noResults}>loading</Text>}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.products}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
  scrollView: {
    marginBottom: 10,
  },
  categories: {
    paddingHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 10,
  },
  categoriesBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryBtn: {
    display: "flex",
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
  },
  categoryText: {
    fontSize: 18,
  },
  products: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  noResults: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
    marginTop: 20,
  },
});

export default AllProduct;
