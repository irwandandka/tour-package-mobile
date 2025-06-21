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
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTranslation } from "react-i18next";
import { validateInput } from "../../utils/validation";
import styles from "./RegisterScreen.styles";

export default function RegisterScreen({ navigation }: any) {
  const { t } = useTranslation();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

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

  const handleLogin = () => {
    // Handle login logic here
    console.log("Register button pressed");
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
          <Text style={styles.title}>{t("registerScreen.title")}</Text>
          <Text style={styles.subtitle}>{t("registerScreen.subtitle")}</Text>

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
              {t("registerScreen.registerButton")}
            </Text>
          </TouchableOpacity>

          {/* Sign In with Google & Facebook */}
          <Text style={styles.orSignInWith}>
            {t("registerScreen.orSignUpWith")}
          </Text>

          <TouchableOpacity style={styles.loginWithGoogle}>
            <Image
              style={{ width: 19 }}
              source={{
                uri: "https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/Icon-Google.png",
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {t("registerScreen.loginWithGoogle")}
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
              {t("registerScreen.loginWithFacebook")}
            </Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signUpWrapper}>
            <Text style={styles.signUpText}>
              {t("registerScreen.login")}
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signUpLink}>
                {t("registerScreen.loginButton")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
