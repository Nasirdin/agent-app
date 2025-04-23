import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { clearTokens, getToken } from "../../helpers";
import { API_URL } from "@env";
import { useSelector } from "react-redux";
import axios from "axios";

const SectionButton = ({ text, onPress, icon }) => (
  <TouchableOpacity style={styles.sectionButton} onPress={onPress}>
    <Ionicons name={icon} size={20} color="#fff" />
    <Text style={styles.sectionButtonText}>{text}</Text>
  </TouchableOpacity>
);

const TabButton = ({ text, onPress }) => (
  <TouchableOpacity style={styles.tabButton} onPress={onPress}>
    <Text>{text}</Text>
  </TouchableOpacity>
);

const Profile = ({ navigation }) => {
  const [photo, setPhoto] = useState("https://via.placeholder.com/100");
  const [exp, setExp] = useState([]);
  const user = useSelector((state) => state.user.user);

  const handlePhotoChange = () => {
    setPhoto("https://via.placeholder.com/100?text=New+Photo");
  };

  const exit = () => {
    clearTokens();
    navigation.navigate("Login");
  };

  const fetchExpenses = async () => {
    try {
      const token = await getToken();

      if (!token) {
        console.error("Токен не найден");
        return rejectWithValue("Токен не найден");
      }

      const res = await axios.get(API_URL + "/orders/user/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExp(res.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#008bd9" />
        </TouchableOpacity>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={handlePhotoChange}>
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={46} color={"#008bd9"} />
            </View>
            {/* <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Flag_of_Kyrgyzstan.svg/1200px-Flag_of_Kyrgyzstan.svg.png",
              }}
              style={styles.profileImage}
            /> */}
          </TouchableOpacity>
          <Text style={styles.name}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.phonenNumber}>{user.phoneNumber}</Text>
        </View>

        <View style={styles.dataSections}>
          {/* <SectionButton
            text="Мои данные"
            onPress={() => {
              navigation.navigate("AboutMe");
            }}
            icon="person-outline"
          /> */}
          <SectionButton
            text="Мои адреса"
            onPress={() => {
              navigation.navigate("Address");
            }}
            icon="location-outline"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{exp.currentMonth || 0} сом</Text>
          <Text style={styles.sectionText}>расходы за этот месяц</Text>
        </View>

        <View style={styles.tabs}>
          <TabButton
            text="Политика конфиденциальности"
            onPress={() => {
              navigation.navigate("PrivacyPolicy");
            }}
          />

          {/* <TabButton text="Настройки" onPress={() => {}} /> */}
          <TabButton
            text="Правила и положения"
            onPress={() => {
              navigation.navigate("TermsAndConditions");
            }}
          />
          <TabButton
            text="О приложении"
            onPress={() => {
              navigation.navigate("About");
            }}
          />
          <TabButton
            text="Связаться с нами"
            onPress={() => {
              navigation.navigate("Contacts");
            }}
          />
        </View>

        <TouchableOpacity onPress={() => exit()} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Выйти</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    padding: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 10,
  },
  profileIcon: {
    borderWidth: 2,
    borderColor: "#008bd9",
    padding: 5,
    borderRadius: "50%",
    marginBottom: 10,
  },
  phonenNumber: {
    fontSize: 18,
    color: "#999",
    fontWeight: 500,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 5,
  },
  dataSections: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionButton: {
    backgroundColor: "#008bd9",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 5,
  },
  section: {
    backgroundColor: "#008bd925",
    padding: 20,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: "#008bd9",
    textAlign: "center",
  },
  sectionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#008bd965",
  },
  tabs: {
    marginTop: 20,
  },
  tabButton: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  logoutButton: {
    padding: 15,
    backgroundColor: "#f44336",
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Profile;
