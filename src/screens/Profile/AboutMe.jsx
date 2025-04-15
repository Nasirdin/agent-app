import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AboutMe = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#008bd9" />
        </TouchableOpacity>
        <Text style={styles.title}>Мои данные</Text>

        <View style={styles.header}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Flag_of_Kyrgyzstan.svg/1200px-Flag_of_Kyrgyzstan.svg.png",
            }}
            style={styles.image}
          />
          <TouchableOpacity>
            <Text style={styles.textEdit}>Изменить</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Номер телефона</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Пароль</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25,
    marginTop: -25,
    color: "#333",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  textEdit: {
    fontSize: 16,
    color: "#008bd9",
    fontWeight: 500,
  },
  backButton: {
    zIndex: 999,
    marginTop: 10,
  },
});

export default AboutMe;
