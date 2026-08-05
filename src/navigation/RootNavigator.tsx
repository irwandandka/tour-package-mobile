import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import LandingScreen from "@features/auth/screens/LandingScreen";
import HomeScreen from "@features/discovery/screens/HomeScreen/HomeScreen";
import ProductScreen from "@features/catalog/screens/Product/ProductScreen";
import AvailableDateScreen from "@features/catalog/screens/AvailableDate/AvailableDateScreen";
import TripOverviewScreen from "@features/booking/screens/TripOverview/TripOverviewScreen";
import PassengerDetailScreen from "@features/booking/screens/PassengerDetail/PassengerDetailScreen";
import PaymentMethodScreen from "@features/booking/screens/PaymentMethod/PaymentMethodScreen";
import PaymentSummaryScreen from "@features/booking/screens/PaymentSummary/PaymentSummaryScreen";
import PaymentQrScreen from "@features/booking/screens/PaymentQR/PaymentQRScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import LanguageScreen from "../screens/Language/LanguageScreen";
import OrderHistoryScreen from "../screens/OrderHistory/OrderHistoryScreen";
import OrderStatusScreen from "@features/booking/screens/OrderStatus/OrderStatusScreen";
import OrderDetailScreen from "../screens/OrderDetail/OrderDetailScreen";
import TermsAndConditions from "../screens/TermCondition/TermConditionScreen";
import { RootStackParamList } from "./types";

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
      <Stack.Screen name="PaymentQr" component={PaymentQrScreen} />
      <Stack.Screen name="OrderStatus" component={OrderStatusScreen} />
      {/* Unauthenticated users land here (Login/Register) */}
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
      {/* Registered but not currently entered from anywhere — see Phase 12 */}
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
