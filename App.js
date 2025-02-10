import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// ---- Components ---- //
import Loading from "./src/screens/Loading";
import Login from "./src/screens/Login";
import Registration from "./src/screens/Registration";
import Profile from "./src/screens/Profile";
import HomeTab from "./src/screens/HomeTab";
import Notification from "./src/screens/Notification";
import OrderHistory from "./src/screens/OrderHistory";
import Product from "./src/components/Product";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import AboutScreen from "./src/screens/AboutScreen";
import PrivacyPolicyScreen from "./src/screens/PrivacyPolicy";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator();

export default function App() {
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
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
