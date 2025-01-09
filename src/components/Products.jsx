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
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.product.products);

  const handleProduct = (product) => {
    dispatch(setActiveProduct(product));
    navigation.navigate("Product");
  };

  return (
    <ScrollView style={styles.products}>
      <View style={styles.container}>
        {productData.map((product, indx) => (
          <View style={styles.card} key={indx}>
            <Image source={{ uri: product.image[0] }} style={styles.image} />
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.manufacturer}>{product.manufacturer}</Text>
                <Text style={styles.price}>{product.price} сом</Text>
                <Text style={styles.description}>{product.description}</Text>
              </View>

              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => handleProduct(product)}
              >
                <Text style={styles.buttonText}>Купить</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    height: 340,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: "relative",
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "55%",
    borderRadius: 12,
    marginBottom: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
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
    fontSize: 14,
    fontWeight: "600",
    color: "#008bd9",
  },
  description: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  buyButton: {
    backgroundColor: "#008bd9",
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Products;
