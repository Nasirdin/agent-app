import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// ---- Components ---- //

const DiscountCard = () => {
  const productData = [
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmxEO_Ib6RimIhNfTVSHH4SL1Aaua2GIQTLzHxsmrQ8RlbcNFxbx0AGWIbA2F7Et4Kolg&usqp=CAU",
      oldPrice: "100",
      newPrice: "80",
      title: "Товар 1",
      subtitle: "Описание товара 1",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPelmN-CMyX7lnkM9vCM3XWbNs2HeIF4P5CJLvc2nSeTGoAWMkLiTx2EcEzHY8gKjfZZs&usqp=CAU",
      oldPrice: "120",
      newPrice: "90",
      title: "Товар 2",
      subtitle: "Описание товара 2",
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsw1QffR6aDQq0bSyiyWMohLgSh0YmLSIEBrVlmiQwYJQXIk2nOiGnuRjg9uT7x6jk-dg&usqp=CAU",
      oldPrice: "150",
      newPrice: "110",
      title: "Товар 3",
      subtitle: "Описание товара 3",
    },
  ];

  return (
    <View style={styles.discount}>
      <Text style={styles.discountTitle}>Акции недели</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productCarousel}
      >
        {productData.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productSubtitle}>{product.subtitle}</Text>
            <View style={styles.productPriceContainer}>
              <Text style={styles.oldPrice}>{product.oldPrice} сом</Text>
              <Text style={styles.newPrice}>{product.newPrice} сом</Text>
            </View>
            <TouchableOpacity style={styles.productButton}>
              <Text style={styles.productButtonText}>Купить</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  discount: {},
  discountTitle: {
    fontSize: 20,
    fontWeight: 700,
  },
  productCard: {
    marginVertical: 10,
    width: 180,
    maxHeight: 240,
    padding: 7,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginTop: 10,
  },
  productSubtitle: {
    fontSize: 14,
    color: "#777",
  },
  productPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  oldPrice: {
    fontSize: 15,
    textDecorationLine: "line-through",
    color: "#777",
    marginRight: 5,
  },
  newPrice: {
    fontSize: 17,
    fontWeight: 600,
    color: "#008bd9",
  },
  productButton: {
    marginTop: 10,
    backgroundColor: "#008bd9",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  productButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
  },
});

export default DiscountCard;
