import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStack from "./AuthStack";
import AuthStackNavigator from "./AuthStack";
import LandingScreen from "../screens/Landing/LandingScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ProductScreen from "../screens/Product/ProductScreen";
import AvailableDateScreen from "../screens/AvailableDate/AvailableDateScreen";
import TripOverviewScreen from "../screens/TripOverview/TripOverviewScreen";
import { RootStackParamList } from "../types/param";
import PassengerDetailScreen from "../screens/PassengerDetail/PassengerDetailScreen";
import PaymentMethodScreen from "../screens/PaymentMethod/PaymentMethodScreen";
import PaymentSummaryScreen from "../screens/PaymentSummary/PaymentSummaryScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import LanguageScreen from "../screens/Language/LanguageScreen";
import OrderHistoryScreen from "../screens/OrderHistory/OrderHistoryScreen";
import OrderStatusScreen from "../screens/OrderStatus/OrderStatusScreen";
import OrderDetailScreen from "../screens/OrderDetail/OrderDetailScreen";
import TermsAndConditions from "../screens/TermCondition/TermConditionScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="TermCondition" component={TermsAndConditions} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="AvailableDate" component={AvailableDateScreen} />
      <Stack.Screen name="TripOverview" component={TripOverviewScreen} />
      <Stack.Screen name="PassengerDetail" component={PassengerDetailScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="PaymentSummary" component={PaymentSummaryScreen} />
      <Stack.Screen name="OrderStatus" component={OrderStatusScreen} />
      {/* Jika user belum login, arahkan ke stack auth (Login/Register) */}
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
      {/* Jika user sudah login, arahkan ke tab utama */}
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
