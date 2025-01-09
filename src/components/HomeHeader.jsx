import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// ---- Components ---- //
import { Ionicons } from "@expo/vector-icons";

const HomeHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerProfileContainer}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Flag_of_Kyrgyzstan.svg/1200px-Flag_of_Kyrgyzstan.svg.png",
          }}
          style={styles.headerProfilePhoto}
        />
        <Text style={styles.headerUsername}>Насирдин</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerNotificationContainer}
        onPress={() => navigation.navigate("Notification")}
      >
        <Ionicons name="notifications" size={24} color={"#008bd9"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerProfilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  headerUsername: {
    fontSize: 22,
    fontWeight: 600,
    color: "#333",
  },
  headerNotificationContainer: {
    padding: 5,
  },
});

export default HomeHeader;
