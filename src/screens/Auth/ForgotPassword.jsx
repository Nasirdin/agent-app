import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SendVerification from "./SendVerification";

// ---- Components ---- //

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <SendVerification />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ForgotPassword;
