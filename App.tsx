import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RootNavigator from "./src/navigations/RootNavigator";
import "./i18n";
import { AuthProvider } from "./contexts/AuthContext";
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <AuthProvider>
      {/* The AuthProvider wraps the entire app to provide authentication context */}
      <NavigationContainer>
        <RootNavigator />
        <Toast />
      </NavigationContainer>
    </AuthProvider>
  );
}
