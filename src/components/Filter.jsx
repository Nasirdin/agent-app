import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import Slider from "@react-native-community/slider"; // Обновить импорт
import { Picker } from "@react-native-picker/picker"; // Импортировать Picker

const Filter = ({ categories, onApplyFilter }) => {
  // Инициализируем значение категории как пустую строку, а не null
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const applyFilter = () => {
    onApplyFilter({ selectedCategory, minPrice, maxPrice });
  };

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Фильтры</Text>

        {/* Категории */}
        <Text style={styles.filterLabel}>Категория</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Выберите категорию" value="" /> {/* Пустая строка вместо null */}
          {categories.map((category) => (
            <Picker.Item
              key={category._id}
              label={category.name}
              value={category._id}
            />
          ))}
        </Picker>

        {/* Цена */}
        <Text style={styles.filterLabel}>Цена</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1000}
          step={10}
          value={minPrice}
          onValueChange={(value) => setMinPrice(value)}
        />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1000}
          step={10}
          value={maxPrice}
          onValueChange={(value) => setMaxPrice(value)}
        />
        <Text>
          Цена: {minPrice} - {maxPrice}
        </Text>

        {/* Кнопка применения фильтра */}
        <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
          <Text style={styles.applyButtonText}>Применить фильтры</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1, // Это заставит контейнер занимать весь экран
    backgroundColor: "#fff",
  },
  filterContainer: {
    padding: 20,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginVertical: 10,
  },
  slider: {
    width: "100%",
    height: 40,
    marginVertical: 10,
  },
  applyButton: {
    padding: 10,
    backgroundColor: "#008bd9",
    borderRadius: 5,
    marginTop: 20,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Filter;
