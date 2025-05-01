import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RootNavigator from "./src/navigations/RootNavigator";
import './i18n';


export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}