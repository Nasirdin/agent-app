import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
// ---- Components ---- //

const Loading = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const isAuthenticated = false;
      if (isAuthenticated) {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    }, 2000);

    return () => clearTimeout(timer);
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
