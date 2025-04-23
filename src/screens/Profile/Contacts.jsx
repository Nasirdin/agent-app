import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { API_URL } from "@env";

const ContactCard = ({ label, phone }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => Linking.openURL(`tel:${phone}`)}
  >
    <Ionicons
      name="call-outline"
      size={24}
      color="#008bd9"
      style={styles.icon}
    />
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.phone}>{phone}</Text>
    </View>
  </TouchableOpacity>
);

const ContactsScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    try {
      const res = await axios.get(API_URL + "/contacts");
      setContacts(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке контактов: ", error);
      Alert.alert("Ошибка", "Не удалось загрузить контакты.");
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#008bd9" />
        </TouchableOpacity>
        <Text style={styles.title}>Контакты</Text>
        {contacts.map((item, index) => (
          <ContactCard key={index} label={item.label} phone={item.phone} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  phone: {
    fontSize: 16,
    color: "#008bd9",
  },
});

export default ContactsScreen;
