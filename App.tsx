import "@i18n";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "@navigation/RootNavigator";
import Toast from "react-native-toast-message";
import { navigationRef } from "@shared/api";
import { AppProviders } from "@app/providers/AppProviders";
import { useAuthStore } from "@features/auth/store/authStore";
import { useSettingsStore } from "@store/settingsStore";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    useSettingsStore.getState().hydrate();
    useAuthStore.getState().hydrate();
  }, []);

  return (
    <AppProviders>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
        <Toast />
      </NavigationContainer>
    </AppProviders>
  );
}
