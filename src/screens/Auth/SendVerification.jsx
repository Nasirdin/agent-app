// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Keyboard,
//   TextInput,
//   Alert,
// } from "react-native";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
// import { SafeAreaView } from "react-native-safe-area-context";

// const SendVerification = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [code, setCode] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [step, setStep] = useState(1);
//   const [timer, setTimer] = useState(120);
//   const [isTimerActive, setIsTimerActive] = useState(false);
//   const [error, setError] = useState("");

//   const sendCode = () => {
//     const cleanedNumber = phoneNumber.replace(/\s+/g, "").replace("+", "");

//     if (!cleanedNumber.startsWith("996") || cleanedNumber.length < 12) {
//       return setError(
//         "Введите корректный номер телефона (например: +996700707070)"
//       );
//     }

//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setStep(2);
//       setIsTimerActive(true);
//     }, 2000);
//   };

//   const resendCode = () => {
//     setTimer(120);
//     sendCode();
//   };

//   const handlePasswordSubmit = () => {
//     if (newPassword.length < 6) {
//       Alert.alert("Пароль должен быть не менее 6 символов.");
//     } else {
//       alert("Пароль изменен успешно!");
//       setStep(1);
//       setPhoneNumber("");
//       setCode("");
//       setNewPassword("");
//     }
//   };

//   useEffect(() => {
//     if (isTimerActive && timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [isTimerActive, timer]);

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Забыли пароль?</Text>

//         <View style={styles.content}>
//           {step === 1 && (
//             <>
//               <Text style={styles.header}>Введите номер телефона</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Номер телефона"
//                 keyboardType="phone-pad"
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//               />
//               {error ? <Text style={styles.errorText}>{error}</Text> : null}
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={sendCode}
//                 disabled={loading || phoneNumber.length < 10}
//               >
//                 <Text style={styles.buttonText}>
//                   {loading ? "Отправка..." : "Отправить код"}
//                 </Text>
//               </TouchableOpacity>
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <Text style={styles.header}>Введите код из SMS</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Код из SMS"
//                 keyboardType="number-pad"
//                 value={code}
//                 onChangeText={setCode}
//               />
//               <Text style={styles.timerText}>Осталось {timer} секунд</Text>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => setStep(3)}
//                 disabled={loading || code.length < 4}
//               >
//                 <Text style={styles.buttonText}>Подтвердить код</Text>
//               </TouchableOpacity>
//               {timer === 0 && (
//                 <TouchableOpacity
//                   style={styles.resendButton}
//                   onPress={resendCode}
//                 >
//                   <Text style={styles.resendButtonText}>
//                     Отправить код заново
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             </>
//           )}

//           {step === 3 && (
//             <>
//               <Text style={styles.header}>Введите новый пароль</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Новый пароль"
//                 secureTextEntry
//                 value={newPassword}
//                 onChangeText={setNewPassword}
//               />
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={handlePasswordSubmit}
//                 disabled={loading || newPassword.length < 6}
//               >
//                 <Text style={styles.buttonText}>Сохранить новый пароль</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   button: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#008bd9",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   timerText: {
//     fontSize: 14,
//     color: "#666",
//     marginVertical: 10,
//   },
//   resendButton: {
//     marginTop: 10,
//   },
//   resendButtonText: {
//     fontSize: 16,
//     color: "#008bd9",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 14,
//     marginBottom: 10,
//     textAlign: "center",
//   },
// });

// export default SendVerification;
