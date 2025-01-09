import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const BestOffers = ({ navigation }) => {
  const [timeLeft, setTimeLeft] = useState(86400);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const sec = seconds % 60;

    return `${String(days).padStart(2, "0")}:${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const productData = [
    {
      id: 1,
      image:
        "https://ritadrinks.com/images/stories/RITA-banner-fruit--500ml.jpg",
      title: "Товар 1",
      description: "Описание товара 1",
      manufacturer: "Производитель 1",
      rating: 4.5,
      newPrice: "100",
      discount: "30%",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReetdQ6OxI4fFmUJmYxQ_F8hsTFD_EJFxMjbH70LYp8em6WcUhcEPpqf1rgVEIrc5_tdc&usqp=CAU",
      title: "Товар 2",
      description: "Описание товара 2",
      manufacturer: "Производитель 2",
      rating: 4.0,
      newPrice: "130",
      discount: "35%",
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {productData.map((product) => (
        <View key={product.id} style={styles.card}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.discountTag}>
            <Text style={styles.discountText}>{product.discount}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.manufacturer}>{product.manufacturer}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.rating}>
              {Array(Math.round(product.rating)).fill("⭐").join("")}
            </Text>

            <Text style={styles.newPrice}>{product.newPrice} сом</Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() =>
                navigation.navigate("ProductDetails", { productId: product.id })
              }
            >
              <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  card: {
    width: 360,
    height: 190,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 10, // Отступ между карточками
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: "relative",
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 12,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  manufacturer: {
    fontSize: 14,
    color: "#777",
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },
  rating: {
    fontSize: 10,
    color: "#f1c40f",
    marginBottom: 5,
  },
  timer: {
    fontSize: 17,
    color: "#fff",
    fontWeight: 700,
  },
  newPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: "#008bd9",
  },
  discountTag: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#f00f00",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  discountText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: "#FF7F32",
    paddingVertical: 8,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
});

export default BestOffers;
