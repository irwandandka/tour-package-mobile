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
import apiService from "../../services/apiService";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";
import { useNavigation } from "@react-navigation/native";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { t } = useTranslation();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleEmailChange = (email: string) => {
    setEmail(email);
    const result = validateInput("email", email, t);
    setErrorEmail(result.error);
  };

  const handleNameChange = (name: string) => {
    setName(name);
    const result = validateInput("name", name, t);
    setErrorName(result.error);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    const result = validateInput("password", password, t);
    setErrorPassword(result.error);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async () => {
    try {
      console.log("Register button pressed");
      const response = await apiService.post("v1/auth/register", {
        email: email,
        password: password,
        name: name,
      });

      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "Please login to continue",
      });

      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FeatherIcon name="chevron-left" size={27} color={"#FFFFFF"} />
        </TouchableOpacity>
        <View style={styles.content}>
          {/* Banner Image */}
          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri: "https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/pana.png",
            }}
          />

          {/* Title and Subtitle */}
          <Text style={styles.title}>{t("registerScreen.title")}</Text>
          <Text style={styles.subtitle}>{t("registerScreen.subtitle")}</Text>

          {/* Input Fields */}
          <View style={styles.inputFieldWrapper}>
            <Text style={styles.inputLabel}>Name</Text>
            <View
              style={[
                styles.inputField,
                { borderWidth: 1, borderColor: errorName ? "red" : "#F5F6FA" },
              ]}
            >
              <FeatherIcon
                name="user"
                size={23}
                color={errorName ? "red" : "#B3B3B3"}
              />
              <TextInput
                placeholder="John Doe"
                placeholderTextColor={"#B3B3B3"}
                onChangeText={handleNameChange}
                value={name}
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>
            {errorName ? (
              <Text style={{ color: "red" }}>{errorName}</Text>
            ) : null}
          </View>
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
                placeholder="example@gmail.com"
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
              !errorEmail && !errorName && !errorPassword
                ? styles.loginButtonActive
                : styles.loginButton
            }
            onPress={handleRegister}
            disabled={!!errorEmail || !!errorName || !!errorPassword}
          >
            <Text
              style={
                !errorEmail && !errorName && !errorPassword
                  ? styles.loginButtonTextActive
                  : styles.loginButtonText
              }
            >
              {t("registerScreen.registerButton")}
            </Text>
          </TouchableOpacity>

          {/* Sign Up with Google & Facebook */}
          {/* <Text style={styles.orSignInWith}>
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
          </TouchableOpacity> */}

          {/* Sign Up Link */}
          <View style={styles.signUpWrapper}>
            <Text style={styles.signUpText}>{t("registerScreen.login")}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
