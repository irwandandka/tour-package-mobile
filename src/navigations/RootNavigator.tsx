import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStack from "./AuthStack";
import LandingScreen from "../screens/Landing/LandingScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ProductScreen from "../screens/Product/ProductScreen";
import AvailableDateScreen from "../screens/AvailableDate/AvailableDateScreen";
import TripOverviewScreen from "../screens/TripOverview/TripOverviewScreen";
import { RootStackParamList } from "../types/param";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="AvailableDate" component={AvailableDateScreen} />
        <Stack.Screen name="TripOverview" component={TripOverviewScreen} />
        {/* Jika user belum login, arahkan ke stack auth (Login/Register) */}
        <Stack.Screen name="Auth" component={AuthStack} />
        {/* Jika user sudah login, arahkan ke tab utama */}
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
  );
}
