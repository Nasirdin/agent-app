import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import { setActiveProduct } from "../store/slices/productSlice";
import promotionIcon from "../../assets/images/akcia.png";

const Products = ({ navigation, products = [] }) => {
  const dispatch = useDispatch();

  const handleProduct = (product) => {
    dispatch(setActiveProduct(product));
    navigation.navigate("Product");
  };

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <Text style={styles.noResults}>Нет товаров</Text>
      ) : (
        products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.card}
            onPress={() => handleProduct(product)}
          >
            {product.images?.[0] ? (
              <Image source={{ uri: product.images[0] }} style={styles.image} />
            ) : (
              <View style={styles.placeholderImage} />
            )}

            {product.promotion && (
              <Image source={promotionIcon} style={styles.promotionIcon} />
            )}

            <View style={styles.cardContent}>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.manufacturer}>
                {product.owner?.companyName || "Неизвестный производитель"}{" "}
              </Text>
              <Text style={styles.price}>{product.price} сом</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  placeholderImage: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    backgroundColor: "#e5e5e5",
    justifyContent: "center",
    alignItems: "center",
  },
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
  promotionIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 110,
    height: 110,
  },
});

export default Products;
