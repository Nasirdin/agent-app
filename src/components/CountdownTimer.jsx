import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const endTime = new Date("2025-01-05T00:00:00"); // Установите конечное время
    const currentTime = new Date();
    const timeLeft = endTime - currentTime;

    if (timeLeft <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((timeLeft / 1000 / 60) % 60),
      seconds: Math.floor((timeLeft / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
        {timeLeft.seconds}s
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#008bd9",
  },
});

export default CountdownTimer;
