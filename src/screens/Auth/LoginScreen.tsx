import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { validateInput } from "../../utils/validation";
import styles from "./LoginScreen.styles";
import apiService from "../../services/apiService";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../../contexts/AuthContext";
import { makeRedirectUri } from "expo-auth-session";

export default function LoginScreen({ navigation }: any) {
  const { t } = useTranslation();

  const { login } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const config = Constants.expoConfig?.extra ?? {};

  const handleEmailChange = (email: string) => {
    setEmail(email);
    const result = validateInput("email", email, t);
    setErrorEmail(result.error);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    const result = validateInput("password", password, t);
    setErrorPassword(result.error);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    try {
      // Handle login logic here
      console.log("Login button pressed");

      console.log('Trying to login with:', { email, password });

      const response = await apiService.post("v1/auth/login", {
        email: email,
        password: password,
      });

      const { access_token, user } = response.data;

      // Store token and user data
      await AsyncStorage.setItem('token', access_token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      console.log("Starting Google login process...");

      // 1. Buat redirect URI untuk kembali ke React Native app
      const redirectUri = "tour-package://redirect";

      console.log("Redirect URI:", redirectUri);

      // 2. Ambil URL login Google dari backend dengan redirectUri
      const response = await apiService.get("v1/auth/google", {
        params: {
          redirect_uri: redirectUri,
        },
      });

      const authUrl = response.url;

      // 3. Buka browser untuk login ke Google
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );

      console.log("WebBrowser result:", result);

      if (result.type === "success" && result.url) {
        // 4. Ambil ?token & ?user (hasil redirect dari backend Laravel)
        const urlObj = new URL(result.url);
        const token = urlObj.searchParams.get("token");
        const userJson = urlObj.searchParams.get("user");

        if (token && userJson) {
          const user = JSON.parse(decodeURIComponent(userJson));
          await login(token, user);
          await AsyncStorage.setItem("authToken", token);
          await AsyncStorage.setItem("userInfo", JSON.stringify(user));

          console.log("Token saved!");
          navigation.navigate("Home");
        } else {
          console.warn("Token or user not found in redirect URL");
        }
      } else {
        console.warn("Google login cancelled or failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Banner Image */}
          <Image
            source={{
              uri: "https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/pana.png",
            }}
          />

          {/* Title and Subtitle */}
          <Text style={styles.title}>{t("loginScreen.title")}</Text>
          <Text style={styles.subtitle}>{t("loginScreen.subtitle")}</Text>

          {/* Input Fields */}
          <View style={styles.inputFieldWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <View
              style={[
                styles.inputField,
                { borderWidth: 1, borderColor: errorEmail ? "red" : "#F5F6FA" },
              ]}
            >
              <FeatherIcon
                name="mail"
                size={23}
                color={errorEmail ? "red" : "#B3B3B3"}
              />
              <TextInput
                placeholder="Enter email"
                placeholderTextColor={"#B3B3B3"}
                onChangeText={handleEmailChange}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errorEmail ? (
              <Text style={{ color: "red" }}>{errorEmail}</Text>
            ) : null}
          </View>
          <View style={styles.inputFieldWrapper}>
            <Text style={styles.inputLabel}>Password</Text>
            <View
              style={[
                styles.inputFieldPassword,
                {
                  borderWidth: 1,
                  borderColor: errorPassword ? "red" : "#F5F6FA",
                },
              ]}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 11 }}
              >
                <FeatherIcon
                  name="lock"
                  size={23}
                  color={errorPassword ? "red" : "#B3B3B3"}
                />
                <TextInput
                  placeholder="Enter password"
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholderTextColor={"#B3B3B3"}
                  secureTextEntry={!passwordVisible}
                />
              </View>
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <FeatherIcon
                  name={passwordVisible ? "eye" : "eye-off"}
                  size={23}
                  color={"#B3B3B3"}
                />
              </TouchableOpacity>
            </View>
            {errorPassword ? (
              <Text style={{ color: "red" }}>{errorPassword}</Text>
            ) : null}
          </View>

          {/* Remember Me & Forgot Password */}
          <View style={styles.rememberMeParent}>
            <View style={styles.rememberMeWrapper}>
              <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                <IonIcon
                  name={rememberMe ? "checkbox-outline" : "square-outline"}
                  size={24}
                  color={rememberMe ? "#3A5694" : "#aaa"}
                />
              </TouchableOpacity>
              <Text>{t("loginScreen.rememberMe")}</Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>
                {t("loginScreen.forgotPassword")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign in Button */}
          <TouchableOpacity
            style={
              !errorEmail && !errorPassword
                ? styles.loginButtonActive
                : styles.loginButton
            }
            onPress={handleLogin}
            disabled={!!errorEmail || !!errorPassword}
          >
            <Text
              style={
                !errorEmail && !errorPassword
                  ? styles.loginButtonTextActive
                  : styles.loginButtonText
              }
            >
              {t("loginScreen.loginButton")}
            </Text>
          </TouchableOpacity>

          {/* Sign In with Google & Facebook */}
          <Text style={styles.orSignInWith}>
            {t("loginScreen.orSignInWith")}
          </Text>

          <TouchableOpacity
            style={styles.loginWithGoogle}
            onPress={() => handleLoginWithGoogle()}
          >
            <Image
              style={{ width: 19 }}
              source={{
                uri: "https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/Icon-Google.png",
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {t("loginScreen.loginWithGoogle")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginWithFacebook}>
            <Image
              style={{ width: 19 }}
              source={{
                uri: "https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/Icon-Facebook.png",
              }}
            />
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#FFFFFF" }}
            >
              {t("loginScreen.loginWithFacebook")}
            </Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signUpWrapper}>
            <Text style={styles.signUpText}>{t("loginScreen.register")}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.signUpLink}>
                {t("loginScreen.registerButton")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
