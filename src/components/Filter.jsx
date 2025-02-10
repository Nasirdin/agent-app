import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Filter = ({ onApplyFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const categories = [
    { _id: "679f960ad8f2770ec524fcef", name: "Фрукты и овощи" },
    { _id: "679f9616d8f2770ec524fcf1", name: "Молочные продукты" },
    { _id: "679f961fd8f2770ec524fcf3", name: "Мясо и рыба" },
    { _id: "679f9627d8f2770ec524fcf5", name: "Хлебобулочные изделия" },
    { _id: "679f962fd8f2770ec524fcf7", name: "Напитки" },
    { _id: "679f963ad8f2770ec524fcf9", name: "Замороженные продукты" },
    { _id: "679f9646d8f2770ec524fcfb", name: "Кондитерские изделия" },
    { _id: "679f964ed8f2770ec524fcfd", name: "Бакалея" },
    { _id: "679f9657d8f2770ec524fcff", name: "Здоровое питание" },
    { _id: "679f9664d8f2770ec524fd01", name: "Продукты для детей" },
    { _id: "679f9671d8f2770ec524fd03", name: "Алкогольные напитки" },
    { _id: "679f967bd8f2770ec524fd05", name: "Чай и кофе" },
    { _id: "679f9693d8f2770ec524fd07", name: "Снеки и закуски" },
    { _id: "679f969cd8f2770ec524fd09", name: "Косметика и гигиена" },
    { _id: "679f96a3d8f2770ec524fd0b", name: "Бытовая химия" },
  ];

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  const handlePriceChange = (type, value) => {
    setPriceRange((prevRange) => ({
      ...prevRange,
      [type]: value,
    }));
  };

  const applyFilter = useCallback(() => {
    onApplyFilter({
      selectedCategory,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    });
  }, [selectedCategory, priceRange, onApplyFilter]);

  const resetFilters = () => {
    setSelectedCategory("");
    setPriceRange({ min: 0, max: 1000 });
  };

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Фильтры</Text>

        {/* Категории */}
        <Text style={styles.filterLabel}>Категория</Text>
        <View>
          <DropDownPicker
            items={categories.map((category) => ({
              label: category.name,
              value: category._id,
            }))}
            defaultValue={selectedCategory}
            containerStyle={{ height: 40 }}
            onChangeItem={(item) => setSelectedCategory(item.value)}
          />
        </View>

        {/* Цена */}
        <Text style={styles.filterLabel}>Цена (KGS)</Text>
        <View style={styles.priceInputs}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={priceRange.min.toString()}
            onChangeText={(value) =>
              handlePriceChange("min", parseInt(value) || 0)
            }
          />
          <Text style={styles.separator}>—</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={priceRange.max.toString()}
            onChangeText={(value) =>
              handlePriceChange("max", parseInt(value) || 0)
            }
          />
        </View>

        {/* Кнопки */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
            <Text style={styles.applyButtonText}>Применить</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
            <Text style={styles.resetButtonText}>Сбросить</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  filterContainer: {
    padding: 20,
  },
  filterTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  priceInputs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  separator: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  applyButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#008bd9",
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resetButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#ddd",
    borderRadius: 8,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Filter;
