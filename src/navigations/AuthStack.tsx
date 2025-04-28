import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";

const AuthStack = createNativeStackNavigator();

export default function AuthStackNavigator() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen
                name="Login"
                component={LoginScreen}
            />
            <AuthStack.Screen
                name="Register"
                component={RegisterScreen}
            />
        </AuthStack.Navigator>
    )
}