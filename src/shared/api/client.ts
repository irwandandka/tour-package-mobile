import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { createNavigationContainerRef } from "@react-navigation/native";
import { ApiErrorBody } from "./types";

export const navigationRef = createNavigationContainerRef<any>();

const config = Constants.expoConfig?.extra ?? {};

export const apiClient = axios.create({
  baseURL: config.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": config.API_KEY,
  },
});

apiClient.interceptors.request.use(
  async (requestConfig) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }

      const lang = (await AsyncStorage.getItem("lang")) || "en";
      const currency = (await AsyncStorage.getItem("currency")) || "IDR";

      requestConfig.params = {
        ...(requestConfig.params || {}),
        lang: lang.toUpperCase(),
        currency,
      };
    } catch (err) {
      console.error("Interceptor error:", err);
    }

    return requestConfig;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorBody>) => {
    const code = error.response?.data?.code;

    if (code === "token_expired" || code === "token_invalid" || code === "token_missing") {
      await SecureStore.deleteItemAsync("token");
      await AsyncStorage.removeItem("user");

      if (navigationRef.isReady()) {
        navigationRef.navigate("Auth", { screen: "Login" });
      }
    }

    return Promise.reject(error);
  },
);
