import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { isTokenExpired, refreshAccessToken } from "../auth";
import { getToken } from "../helpers";

const Loading = ({ navigation }) => {
  const checkAndRefreshToken = async () => {
    const token = await getToken();
    if (token && !isTokenExpired(token)) {
      navigation.replace("Main");
    } else {
      const newToken = await refreshAccessToken();
      if (newToken) {
        navigation.replace("Main");
      } else {
        navigation.replace("Login");
      }
    }
  };

  useEffect(() => {
    checkAndRefreshToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Загрузка...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008BD9",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});

export default Loading;
