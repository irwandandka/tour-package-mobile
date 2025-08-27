import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigations/RootNavigator";
import "./i18n";
import { AuthProvider } from "./contexts/AuthContext";
import Toast from 'react-native-toast-message';
import { navigationRef } from "./src/services/api";

export default function App() {
  return (
    <AuthProvider>
      {/* The AuthProvider wraps the entire app to provide authentication context */}
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
        <Toast />
      </NavigationContainer>
    </AuthProvider>
  );
}
