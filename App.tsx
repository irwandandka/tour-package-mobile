import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigations/RootNavigator";
import i18n from "./i18n";
import { AuthProvider } from "./contexts/AuthContext";
import Toast from "react-native-toast-message";
import { navigationRef } from "@shared/api";
import { AppProviders } from "@app/providers/AppProviders";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  useEffect(() => {
    const initLang = async () => {
      const lang = await AsyncStorage.getItem("lang");
      if (lang) {
        i18n.changeLanguage(lang);
      } else {
        await AsyncStorage.setItem("lang", "en");
        i18n.changeLanguage("en");
      }
    };
    initLang();
  }, []);

  return (
    <AppProviders>
      <AuthProvider>
        {/* The AuthProvider wraps the entire app to provide authentication context */}
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
          <Toast />
        </NavigationContainer>
      </AuthProvider>
    </AppProviders>
  );
}
