import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchCategories } from "../store/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const Filter = ({ onApplyFilter }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handlePriceChange = (type, value) => {
    setPriceRange((prevRange) => ({
      ...prevRange,
      [type]: Number(value) || 0,
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
    setPriceRange({ min: 0, max: 10000 });
  };

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Фильтры</Text>

        <Text style={styles.filterLabel}>Категория</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Выберите категорию" value="" />
            {categories.map((category) => (
              <Picker.Item
                key={category._id}
                label={category.name}
                value={category._id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.filterLabel}>Цена (KGS)</Text>
        <View style={styles.priceInputs}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={priceRange.min.toString()}
            onChangeText={(value) => handlePriceChange("min", value)}
          />
          <Text style={styles.separator}>—</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={priceRange.max.toString()}
            onChangeText={(value) => handlePriceChange("max", value)}
          />
        </View>

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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  picker: {
    height: 50,
    width: "100%",
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
