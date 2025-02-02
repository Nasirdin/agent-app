import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setActiveProduct } from "../store/slices/productSlice";

const Products = ({ navigation }) => {
  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  const handleProduct = (product) => {
    dispatch(setActiveProduct(product));
    navigation.navigate("Product");
  };

  const productList = Array.isArray(products) ? products : [];

  return (
    <ScrollView style={styles.products}>
      <View style={styles.container}>
        {productList.length === 0 ? (
          <Text style={styles.noResults}>Нет товаров</Text>
        ) : (
          productList.map((product, indx) => (
            <TouchableOpacity
              key={indx}
              style={styles.card}
              onPress={() => handleProduct(product)}
            >
              <Image source={{ uri: product.images[0] }} style={styles.image} />
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.title}>{product.name}</Text>
                  <Text style={styles.manufacturer}>{product.owner.name}</Text>
                  <Text style={styles.price}>{product.price} сом</Text>
                  <Text style={styles.description}>{product.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  products: {},
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardContent: {},
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  manufacturer: {
    fontSize: 14,
    color: "#777",
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
    color: "#008bd9",
  },
  description: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
  },
  noResults: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
    marginTop: 20,
  },
});

export default Products;
