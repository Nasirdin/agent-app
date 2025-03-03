import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Products from "./Products";
import { addToCart } from "../store/slices/userSlice";

const screenWidth = Dimensions.get("window").width;

const Product = ({ navigation }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [isBuying, setIsBuying] = useState(false);

  const product = useSelector((state) => state.product.activeProduct);
  const user = useSelector((state) => state.user.user);
  const totalPrice = parseFloat(product.price) * quantity;

  const dispatch = useDispatch();

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuy = () => {
    setIsBuying(true);
    setQuantity(quantity + 1);
  };

  const addProductToCart = () => {
    dispatch(addToCart({ userId: user.id, productId: product._id, quantity }));
    Toast.show({
      type: "success",
      position: "top",
      text1: "Товар добавлен в корзину!",
      text2: "Ваш товар будет размещен в корзине.",
      visibilityTime: 3000,
      autoHide: true,
    });
    setIsBuying(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#008bd9" />
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroll}
        >
          {product.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
        </ScrollView>

        <View style={styles.infoContainer}>
          <Text style={styles.soldCount}>Продано: 1200 шт.</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={handleSave}>
              <Ionicons
                name={saved ? "heart" : "heart-outline"}
                size={30}
                color={saved ? "red" : "#008bd9"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.title}>{product.name}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{product.price} сом</Text>
        </View>

        {quantity <= 0 || !isBuying ? (
          <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
            <Text style={styles.buyButtonText}>Купить</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityContainer}>
            <Text style={styles.totalPrice}>Общая цена: {totalPrice} сом</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                onPress={handleDecreaseQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={handleIncreaseQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.buyButton}
              onPress={addProductToCart}
            >
              <Text style={styles.buyButtonText}>Добавить в корзину</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.minOrderContainer}>
          <Text style={styles.minOrderText}>Минимальный заказ: 10 шт.</Text>
        </View>

        <Text style={styles.category}>
          Категория:{" "}
          <Text style={styles.categoryName}>{product.category.name}</Text>
        </Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity
          style={styles.manufacturerInfo}
          onPress={() => navigation.navigate("Profile")}
        >
          <View style={styles.manufacturerDetails}>
            <Image
              source={{
                uri: "https://via.placeholder.com/80",
              }}
              style={styles.manufacturerLogo}
            />
            <View>
              <Text style={styles.companyName}>{product.owner.name}</Text>
              <Text style={styles.ownerName}>
                Входит в топ 5 лучших на Agent
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.similarTitle}>Похожие товары</Text>

        <Products navigation={navigation} />
      </ScrollView>

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: Platform.OS === "android" ? 5 : 10,
  },
  imageScroll: {
    height: 250,
    marginBottom: 10,
  },
  image: {
    width: screenWidth * 0.95,
    height: "100%",
    borderRadius: 12,
    marginRight: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
    gap: 10,
  },
  soldCount: {
    fontSize: 14,
    color: "#555",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 28,
    fontWeight: "700",
    color: "#008bd9",
  },
  quantityContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#008bd9",
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#e5e5e5",
    borderRadius: 5,
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: "#008bd9",
    padding: 10,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 20,
    width: 70,
    textAlign: "center",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "600",
    width: 50,
    textAlign: "center",
  },
  buyButton: {
    backgroundColor: "#008bd9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: "100%",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  minOrderContainer: {
    backgroundColor: "#FFF3E1",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderRadius: 10,
  },
  minOrderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF7F32",
  },
  manufacturerInfo: {
    marginBottom: 20,
  },
  manufacturerDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#008bd910",
  },
  manufacturerLogo: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: "#008bd935",
  },
  category: {
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 500,
    color: "#666",
  },
  categoryName: {
    color: "#000",
  },
  description: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 15,
    backgroundColor: "#99999915",
    padding: 10,
    borderRadius: 8,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "700",
  },
  ownerName: {
    fontSize: 14,
    color: "#555",
  },
  similarTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  backButton: {
    marginBottom: 10,
  },
});

export default Product;
