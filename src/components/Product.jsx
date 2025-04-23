import React, { useEffect, useState, useCallback, useMemo } from "react";
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
import { addToCart } from "../store/slices/userSlice";
import { API_URL } from "@env";
import { toggleFavoriteProducts } from "../store/slices/productSlice";
import { useFocusEffect } from "@react-navigation/native";
import { getToken } from "../helpers";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { getOwner } from "../store/slices/ownerSlice";

const screenWidth = Dimensions.get("window").width;

const Product = ({ navigation }) => {
  const [quantity, setQuantity] = useState(0);
  const [isBuying, setIsBuying] = useState(false);
  const [save, setSave] = useState(false);

  const product = useSelector((state) => state.product.activeProduct);
  const dispatch = useDispatch();

  const totalPrice = useMemo(
    () => parseFloat(product?.price ?? 0) * quantity,
    [product?.price, quantity]
  );

  const handleIncreaseQuantity = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const handleDecreaseQuantity = useCallback(() => {
    if (quantity > (product?.minAmount || 1)) {
      setQuantity((prev) => prev - 1);
    }
  }, [quantity, product?.minAmount]);

  const handleBuy = useCallback(() => {
    setIsBuying(true);
  }, []);

  const addProductToCart = useCallback(() => {
    if (!product || quantity <= 0) return;
    dispatch(addToCart({ productId: product.id, quantity }));
    Toast.show({
      type: "success",
      position: "top",
      text1: "Товар добавлен в корзину!",
      text2: "Ваш товар будет размещен в корзине.",
      visibilityTime: 3000,
      autoHide: true,
    });
    setIsBuying(false);
  }, [dispatch, product, quantity]);

  const toogleFavoriteProduct = () => {
    dispatch(toggleFavoriteProducts({ productId: product.id }));
    setSave(!save);
  };

  useEffect(() => {
    if (product?.minAmount && quantity === 0) {
      setQuantity(product.minAmount);
    }
  }, [product]);

  const getFavoriteProduct = async () => {
    try {
      const token = await getToken();
      if (!token) return isRejectedWithValue("Токен не найден");
      const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axiosInstance.get(`products/favoriteProduct`, {
        params: { productId: product.id },
      });
      if (response.data !== null) {
        setSave(true);
      } else {
        setSave(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getFavoriteProduct();
    }, [product?.id])
  );

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Продукт не найден
        </Text>
      </SafeAreaView>
    );
  }

  const handleOwnerBtn = (ownerId) => {
    dispatch(getOwner(ownerId));
    navigation.navigate("Owner");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#008bd9" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toogleFavoriteProduct}>
            <Ionicons
              name={save ? "heart" : "heart-outline"}
              size={30}
              color={save ? "red" : "#008bd9"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroll}
        >
          {product?.images?.map((image, index) => (
            <Image
              key={`${image}_${index}`}
              source={{ uri: image }}
              style={styles.image}
            />
          ))}
        </ScrollView>

        <Text style={styles.title}>{product?.name ?? "Без названия"}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{product?.price ?? 0} сом</Text>
        </View>

        {!isBuying ? (
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
          <Text style={styles.minOrderText}>
            Минимальный заказ: {product.minAmount} шт.
          </Text>
        </View>

        <Text style={styles.category}>
          Категория:{" "}
          <Text style={styles.categoryName}>
            {product?.category?.name ?? "Неизвестно"}
          </Text>
        </Text>

        {product.promotion && (
          <View style={styles.promotion}>
            <Text style={styles.promotionTitle}>Акция</Text>
            <Text style={styles.promotionDescription}>
              {product?.promotionDescription ?? "Нет описания"}
            </Text>
          </View>
        )}

        <Text style={styles.description}>
          {product?.description ?? "Нет описания"}
        </Text>

        <TouchableOpacity
          style={styles.manufacturerInfo}
          onPress={() => handleOwnerBtn(product?.owner.id)}
        >
          <View style={styles.manufacturerDetails}>
            <View style={styles.manufacturerIcon}>
              <Ionicons name="storefront-outline" size={32} color={"#008bd9"} />
            </View>
            <View>
              <Text style={styles.companyName}>
                {product?.owner?.companyName ?? "Неизвестная компания"}
              </Text>
              {/* <Text style={styles.ownerName}>
                Входит в топ 5 лучших на Agent
              </Text> */}
            </View>
          </View>
        </TouchableOpacity>

        {/* <Text style={styles.similarTitle}>Похожие товары</Text>
        <Products navigation={navigation} /> */}
      </ScrollView>

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  price: {
    fontSize: 28,
    fontWeight: "700",
    color: "#008bd9",
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
  quantityContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#008bd9",
    marginBottom: 15,
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
  minOrderContainer: {
    backgroundColor: "#FFF3E1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  minOrderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF7F32",
  },
  category: {
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  categoryName: {
    color: "#000",
  },
  promotion: {
    backgroundColor: "#ff000015",
    padding: 10,
    marginBottom: 5,
  },
  promotionTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 10,
    color: "#008bd9",
  },
  promotionDescription: {
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
    backgroundColor: "#99999915",
    padding: 10,
    borderRadius: 8,
  },
  manufacturerInfo: {
    marginBottom: 20,
  },
  manufacturerDetails: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#008bd910",
  },
  manufacturerIcon: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#008bd9",
    borderRadius: "50%",
    marginRight: 10,
  },
  manufacturerLogo: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: "#008bd935",
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
