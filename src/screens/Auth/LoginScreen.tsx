import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { validateInput } from "../../utils/validation";

export default function LoginScreen({ navigation }: any) {
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
    console.log("Login button pressed");
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

          <TouchableOpacity style={styles.loginWithGoogle}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    color: "#3A5694",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  inputFieldWrapper: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 20,
    gap: 9,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    backgroundColor: "#F5F6FA",
    paddingVertical: 19,
    paddingHorizontal: 22,
    borderRadius: 15,
  },
  inputFieldPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 11,
    backgroundColor: "#F5F6FA",
    paddingVertical: 19,
    paddingHorizontal: 22,
    borderRadius: 15,
  },
  rememberMeParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 12,
  },
  rememberMeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
    gap: 10,
  },
  forgotPassword: {
    fontSize: 14,
    color: "#F29D38",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#F5F6FA",
    width: "100%",
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 30,
  },
  loginButtonActive: {
    backgroundColor: "#3A5694",
    width: "100%",
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 30,
  },
  loginButtonTextActive: {
    fontSize: 21,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  orSignInWith: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666666",
    textAlign: "center",
    marginVertical: 30,
  },
  loginButtonText: {
    fontSize: 21,
    textAlign: "center",
    fontWeight: "bold",
    color: "#B3B3B3",
  },
  loginWithGoogle: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#F2F2F2",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 15,
  },
  loginWithFacebook: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#3A5694",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  signUpWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 9,
  },
  signUpText: {
    fontSize: 16,
    color: "#666666",
  },
  signUpLink: {
    fontSize: 16,
    color: "#F29D38",
    fontWeight: "bold",
  },
});
