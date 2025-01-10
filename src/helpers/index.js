import * as SecureStore from "expo-secure-store";

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("access_token");
    if (token) {
      return token; // Преобразование не требуется, так как токен уже строка
    }
    return null;
  } catch (error) {
    console.error("Error getting token", error);
  }
};
