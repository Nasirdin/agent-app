import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { fetchCategories } from "../store/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const getCategoryColor = (id) => {
  const colors = [
    "#FFB6C130",
    "#20B2AA30",
    "#7FFFD430",
    "#98FB9830",
    "#FFD70030",
    "#87CEFA30",
    "#9370DB30",
    "#FF450030",
    "#FF69B430",
    "#FF634730",
  ];
  return colors[id % colors.length];
};

const Catalog = ({ navigation }) => {
  const { categories, loading, error } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCategories(
      categories.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, categories]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.category, { backgroundColor: getCategoryColor(item.id) }]}
      onPress={() =>
        navigation.navigate("CategoryProducts", { categoryId: item.id })
      }
    >
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
      )}
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск категории..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={(styles.categoryContent, { flex: 1 })}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#008bd9"
                style={styles.loader}
              />
            ) : error ? (
              <Text style={styles.errorText}>Ошибка загрузки категорий</Text>
            ) : filteredCategories.length === 0 ? (
              <Text style={styles.emptyText}>Категории не найдены</Text>
            ) : (
              <FlatList
                data={filteredCategories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.categoryRow}
                contentContainerStyle={styles.listContent}
                keyboardShouldPersistTaps="handled"
              />
            )}
          </View>
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
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 15,
  },
  loader: {
    marginTop: 20,
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
  listContent: {
    paddingBottom: 20,
  },
  categoryRow: {
    justifyContent: "space-between",
  },
  categoryContent: {
    paddingHorizontal: 15,
  },
  category: {
    width: "49%",
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
  },
  categoryText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    width: "100%",
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
});

export default Catalog;
