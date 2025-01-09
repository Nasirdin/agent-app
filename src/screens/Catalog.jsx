import React from "react";
import { View, Text, StyleSheet } from "react-native";
// ---- Components ---- //

const Catalog = () => {
  const categories = [
    {
      id: 1,
      key: "food",
      name: "Продукты питания",
      subCategories: [
        { id: 1, key: "fruits_veggies", name: "Фрукты и овощи" },
        { id: 2, key: "meat_fish", name: "Мясо и рыба" },
        { id: 3, key: "dairy_eggs", name: "Молочные продукты и яйца" },
        { id: 4, key: "bread_bakery", name: "Хлеб и выпечка" },
        { id: 5, key: "grains_pasta", name: "Крупы и макароны" },
        { id: 6, key: "canned_goods", name: "Консервы" },
        { id: 7, key: "sweets_snacks", name: "Сладости и снеки" },
        { id: 8, key: "beverages", name: "Напитки" },
        { id: 9, key: "frozen_foods", name: "Замороженные продукты" },
      ],
    },
    {
      id: 2,
      key: "household_chemicals",
      name: "Бытовая химия",
      subCategories: [
        { id: 1, key: "washing_detergents", name: "Средства для стирки" },
        { id: 2, key: "cleaning_products", name: "Моющие средства" },
        { id: 3, key: "air_fresheners", name: "Освежители воздуха" },
        { id: 4, key: "cleaning_supplies", name: "Товары для уборки" },
        {
          id: 5,
          key: "home_care_products",
          name: "Средства для ухода за домом",
        },
      ],
    },
    {
      id: 3,
      key: "hygiene_products",
      name: "Гигиенические товары",
      subCategories: [
        { id: 1, key: "personal_hygiene", name: "Средства личной гигиены" },
        { id: 2, key: "paper_products", name: "Бумажная продукция" },
        { id: 3, key: "cosmetics", name: "Косметика" },
        { id: 4, key: "shaving_products", name: "Товары для бритья" },
      ],
    },
    {
      id: 4,
      key: "baby_products",
      name: "Детские товары",
      subCategories: [
        { id: 1, key: "baby_food", name: "Детское питание" },
        { id: 2, key: "diapers", name: "Подгузники" },
        { id: 3, key: "toys", name: "Игрушки" },
        { id: 4, key: "baby_hygiene", name: "Средства гигиены для детей" },
      ],
    },
    {
      id: 5,
      key: "specialty_foods",
      name: "Специальные продукты",
      subCategories: [
        { id: 1, key: "spices", name: "Специи" },
        { id: 2, key: "nuts_seeds", name: "Орехи и семена" },
        { id: 3, key: "oils_vinegars", name: "Масла и уксусы" },
        { id: 4, key: "sauces_condiments", name: "Соусы и приправы" },
        { id: 5, key: "baking_supplies", name: "Принадлежности для выпечки" },
        { id: 6, key: "dried_fruits", name: "Сухофрукты" },
      ],
    },
  ];

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({});

export default Catalog;
