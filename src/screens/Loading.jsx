import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getToken } from "../helpers";

const Loading = ({ navigation }) => {
  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();

      if (token) {
        navigation.replace("Main"); // Перейти на главный экран
      } else {
        navigation.replace("Login"); // Перейти на экран входа
      }
    };

    checkToken();
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
