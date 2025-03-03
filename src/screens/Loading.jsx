import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@env";
import { useFonts, Sail_400Regular } from "@expo-google-fonts/sail";

const Loading = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Sail_400Regular,
  });

  useEffect(() => {
    checkAndRefreshToken();
  }, []);

  const checkAndRefreshToken = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync("access_token");
      const refreshToken = await SecureStore.getItemAsync("refresh_token");

      if (accessToken && !isTokenExpired(accessToken)) {
        navigation.replace("Main");
        return;
      }

      if (!refreshToken) {
        navigation.replace("Login");
        return;
      }

      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken) {
        navigation.replace("Main");
      } else {
        navigation.replace("Login");
      }
    } catch (error) {
      navigation.replace("Login");
    }
  };

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post(`${API_URL}/users/refresh-token`, {
        refreshToken,
      });

      const { accessToken } = response.data;
      await SecureStore.setItemAsync("access_token", accessToken);
      return accessToken;
    } catch (error) {
      return null;
    }
  };

  const isTokenExpired = (token) => {
    try {
      const [, payloadBase64] = token.split(".");
      const payload = JSON.parse(atob(payloadBase64));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Agent</Text>
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
    fontSize: 80,
    fontFamily: "Sail_400Regular",
  },
});

export default Loading;
