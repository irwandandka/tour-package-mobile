import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStack from "./AuthStack";
import LandingScreen from "../screens/Landing/LandingScreen";
import HomeScreen from "../screens/Home/HomeScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Jika user belum login, arahkan ke stack auth (Login/Register) */}
        <Stack.Screen name="Auth" component={AuthStack} />
        {/* Jika user sudah login, arahkan ke tab utama */}
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
  );
}
