import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";
import { apiService } from "@shared/api";
import { getApiErrorMessage } from "@shared/utils";
import { TextField } from "@shared/components";
import { theme } from "@shared/constants/theme";
import { registerSchema, RegisterFormValues } from "../schemas/register.schema";
import styles from "../styles/authForm.styles";

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Register">;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { t } = useTranslation();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      await apiService.post("v1/auth/register", values);

      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "Please login to continue",
      });

      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: getApiErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
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

          <Text style={styles.title}>{t("registerScreen.title")}</Text>
          <Text style={styles.subtitle}>{t("registerScreen.subtitle")}</Text>

          <TextField
            control={control}
            name="name"
            label="Name"
            placeholder="John Doe"
            errorMessage={errors.name?.message && t(errors.name.message)}
          />

          <TextField
            control={control}
            name="email"
            label="Email"
            placeholder="example@gmail.com"
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
              {isSubmitting ? "..." : t("registerScreen.registerButton")}
            </Text>
          </TouchableOpacity>

          {/* Sign Up with Google & Facebook — no handler exists for
              register-via-Google yet, unlike LoginScreen's Google flow
              which is fully built. Left disabled/commented until that
              handler exists (a product decision, not made here). */}
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

          <View style={styles.signUpWrapper}>
            <Text style={styles.signUpText}>{t("registerScreen.login")}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signUpLink}>{t("registerScreen.loginButton")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
