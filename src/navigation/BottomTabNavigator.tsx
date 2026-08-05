import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "@features/discovery/screens/HomeScreen/HomeScreen";
import CartScreen from "../screens/Cart/CartScreen";
import ProfileScreen from "@features/profile/screens/Profile/ProfileScreen";
import { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

/** Not currently entered from anywhere in the app — see Phase 12. */
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
