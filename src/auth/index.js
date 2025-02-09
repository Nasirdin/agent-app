import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@env";

export const refreshAccessToken = async () => {
  const refreshToken = await SecureStore.getItemAsync("refresh_token");

  if (refreshToken) {
    try {
      const response = await axios.post(API_URL + "/users/refresh-token", {
        refreshToken,
      });
      const { accessToken } = response.data;
      await SecureStore.setItemAsync("access_token", accessToken);
      return accessToken;
    } catch (error) {
      console.error("Ошибка запроса:", error.response?.data || error.message);
      return null;
    }
  }
  return null;
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};
