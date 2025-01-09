import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

// ---- Components ---- //

const News = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const newsData = [
    {
      id: 1,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/f2/52/f2/caption.jpg?w=500&h=400&s=1",
    },
    {
      id: 2,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/60/6a/e9/caption.jpg?w=800&h=800&s=1",
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnXTr8GZxqx3KndNjihpwvArHXfM1DkU_Mwg&s",
    },
    {
      id: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI_oGfu1qV121Sw_I3QtS9cbdISiWwLwTmMw&s",
    },
    {
      id: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJyAPpk8m_c0Kh_1ZloWPCJW5KOHTeQz40iw&s",
    },
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.newsContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.news}
      >
        {newsData.map((news) => (
          <TouchableOpacity
            key={news.id}
            onPress={() => openModal(news.image)}
            style={styles.newsCardWrapper}
          >
            <LinearGradient
              colors={["#008bd9", "#00f00f"]}
              style={styles.newsCard}
            >
              <Image source={{ uri: news.image }} style={styles.newsImage} />
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.modalClose} onPress={closeModal}>
            <Ionicons name="close" size={30} color="#fff" />
          </Pressable>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullscreenImage}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  news: {
    flexDirection: "row",
    marginBottom: 5,
  },
  newsCardWrapper: {
    marginRight: 10,
  },
  newsCard: {
    width: 100,
    height: 100,
    borderRadius: 16,
    padding: 3,
  },
  newsImage: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalClose: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  fullscreenImage: {
    width: "90%",
    height: "70%",
    borderRadius: 16,
  },
});

export default News;
