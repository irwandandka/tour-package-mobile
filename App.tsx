import "@i18n";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import RootNavigator from "@navigation/RootNavigator";
import Toast from "react-native-toast-message";
import { navigationRef } from "@shared/api";
import { AppProviders } from "@app/providers/AppProviders";
import { useAuthStore } from "@features/auth/store/authStore";
import { useSettingsStore } from "@store/settingsStore";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const isAuthHydrated = useAuthStore((state) => state.isHydrated);
  const isSettingsHydrated = useSettingsStore((state) => state.isHydrated);

  useEffect(() => {
    useSettingsStore.getState().hydrate();
    useAuthStore.getState().hydrate();
  }, []);

  useEffect(() => {
    if (isAuthHydrated && isSettingsHydrated) {
      SplashScreen.hideAsync();
    }
  }, [isAuthHydrated, isSettingsHydrated]);

  return (
    <AppProviders>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
        <Toast />
      </NavigationContainer>
    </AppProviders>
  );
}
