// helpers.js
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "@env";
import { jwtDecode } from "jwt-decode";

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("access_token");

    if (token) {
      return token;
    }
    return null;
  } catch (error) {
    console.error("Error getting token", error);
  }
};

export const saveTokens = async (accessToken, refreshToken) => {
  try {
    await SecureStore.setItemAsync("access_token", accessToken);
    await SecureStore.setItemAsync("refresh_token", refreshToken);
  } catch (error) {
    console.error("Error saving tokens", error);
  }
};

export const checkAndRefreshToken = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("access_token");
    const refreshToken = await SecureStore.getItemAsync("refresh_token");

    if (!refreshToken) {
      console.log("Отсутствует refreshToken");
      return;
    }
    if (!accessToken || isTokenExpired(accessToken)) {
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (newAccessToken) {
        await SecureStore.setItemAsync("access_token", newAccessToken);
        console.log("Токен успешно обновлен");
      } else {
        console.log(
          "Ошибка обновления токена, пользователь должен заново войти"
        );
      }
    }
  } catch (error) {
    console.log("Ошибка при проверке/обновлении токена:", error);
  }
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_URL}/users/refresh-token`, {
      refreshToken,
    });

    return response.data.accessToken || null;
  } catch (error) {
    console.log("Ошибка при обновлении accessToken:", error);
    return null;
  }
};

const isTokenExpired = (token) => {
  try {
    if (!token) return true;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.log("Ошибка декодирования токена:", error);
    return true;
  }
};
// Clear tokens
export const clearTokens = async () => {
  try {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
  } catch (error) {
    console.error("Error clearing tokens", error);
  }
};
