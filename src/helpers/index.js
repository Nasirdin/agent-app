// helpers.js
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_URL } from "@env";

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

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = await SecureStore.getItemAsync("refresh_token");
    if (!refreshToken) {
      return null;
    }

    const response = await axios.post(API_URL + "/users/refresh-token", {
      refreshToken,
    });
    const { accessToken } = response.data;
    await SecureStore.setItemAsync("access_token", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token", error);
    return null;
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
