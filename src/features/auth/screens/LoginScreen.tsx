import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList, RootStackParamList } from "@navigation/types";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { apiService } from "@shared/api";
import { getApiErrorMessage } from "@shared/utils";
import { TextField } from "@shared/components";
import { theme } from "@shared/constants/theme";
import { useAuthStore } from "../store/authStore";
import { loginSchema, LoginFormValues } from "../schemas/login.schema";
import styles from "../styles/authForm.styles";

type LoginScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, "Login">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { t } = useTranslation();
  const login = useAuthStore((state) => state.login);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const { access_token, user } = await apiService.post<{
        access_token: string;
        user: Parameters<typeof login>[1];
      }>("v1/auth/login", values);

      await login(access_token, user);

      Toast.show({ type: "success", text1: "Login Successful", text2: "Welcome back!" });
      navigation.navigate("Home");
    } catch (error) {
      Toast.show({ type: "error", text1: "Login Failed", text2: getApiErrorMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    setIsGoogleSubmitting(true);
    try {
      const redirectUri = "tour-package://redirect";
      const response = await apiService.get<{ url: string }>("v1/auth/google", {
        redirect_uri: redirectUri,
      });

      const result = await WebBrowser.openAuthSessionAsync(response.url, redirectUri);

      if (result.type === "success" && result.url) {
        const urlObj = new URL(result.url);
        const token = urlObj.searchParams.get("token");
        const userJson = urlObj.searchParams.get("user");

        if (token && userJson) {
          const user = JSON.parse(decodeURIComponent(userJson));
          await login(token, user);
          navigation.navigate("Home");
        } else {
          Toast.show({ type: "error", text1: "Google login failed", text2: "Please try again." });
        }
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Google login failed", text2: getApiErrorMessage(error) });
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FeatherIcon name="chevron-left" size={27} color={theme.colors.white} />
        </TouchableOpacity>
        <View style={styles.content}>
          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri: "https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/pana.png",
            }}
          />

          <Text style={styles.title}>{t("loginScreen.title")}</Text>
          <Text style={styles.subtitle}>{t("loginScreen.subtitle")}</Text>

          <TextField
            control={control}
            name="email"
            label="Email"
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            errorMessage={errors.email?.message && t(errors.email.message)}
          />

          <View style={styles.inputFieldWrapper}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextField
              control={control}
              name="password"
              placeholder="Enter password"
              secureTextEntry={!passwordVisible}
              errorMessage={errors.password?.message && t(errors.password.message)}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible((visible) => !visible)}
              style={{ position: "absolute", right: 22, top: 16 }}
            >
              <FeatherIcon
                name={passwordVisible ? "eye" : "eye-off"}
                size={23}
                color={theme.colors.grey500}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButtonActive}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Text style={styles.loginButtonTextActive}>
              {isSubmitting ? "..." : t("loginScreen.loginButton")}
            </Text>
          </TouchableOpacity>

          <Text style={styles.orSignInWith}>{t("loginScreen.orSignInWith")}</Text>

          <TouchableOpacity
            style={styles.loginWithGoogle}
            onPress={handleLoginWithGoogle}
            disabled={isGoogleSubmitting}
          >
            <Image
              style={{ width: 19, height: 19 }}
              source={{
                uri: "https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/Icon-Google.png",
              }}
            />
            <Text
              style={{
                fontSize: theme.typography.fontSize.md,
                fontWeight: theme.typography.fontWeight.bold,
              }}
            >
              {isGoogleSubmitting ? "..." : t("loginScreen.loginWithGoogle")}
            </Text>
          </TouchableOpacity>

          <View style={styles.signUpWrapper}>
            <Text style={styles.signUpText}>{t("loginScreen.register")}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.signUpLink}>{t("loginScreen.registerButton")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
