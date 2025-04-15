import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// ---- Components ---- //
import Loading from "./src/screens/Loading";
import Login from "./src/screens/Auth/Login";
import Registration from "./src/screens/Auth/Registration";
import Profile from "./src/screens/Profile/Profile";
import HomeTab from "./src/screens/HomeTab";
import Notification from "./src/screens/Notification";
import OrderHistory from "./src/screens/OrderHistory";
import Product from "./src/components/Product";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import AboutScreen from "./src/screens/Profile/AboutScreen";
import PrivacyPolicyScreen from "./src/screens/Profile/PrivacyPolicy";
import Toast from "react-native-toast-message";
import Order from "./src/screens/Order";
import Address from "./src/screens/Profile/Address";
import ForgotPassword from "./src/screens/Auth/ForgotPassword";
import { useEffect } from "react";
import { checkAndRefreshToken } from "./src/helpers";
import TermsAndConditionsScreen from "./src/screens/Profile/TermsAndConditionsScreen";
import AboutMe from "./src/screens/Profile/AboutMe";
import CategoryProducts from "./src/screens/CategoryProducts";
import Favorite from "./src/screens/Favorite";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkAndRefreshToken();
    }, 1 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Main" component={HomeTab} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          <Stack.Screen
            name="TermsAndConditions"
            component={TermsAndConditionsScreen}
          />
          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="AboutMe" component={AboutMe} />
          <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
          <Stack.Screen name="Favorite" component={Favorite} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
