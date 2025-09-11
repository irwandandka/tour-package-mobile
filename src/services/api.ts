import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { createNavigationContainerRef } from "@react-navigation/native";
export const navigationRef = createNavigationContainerRef<any>();

const config = Constants.expoConfig?.extra ?? {};

const api = axios.create({
    baseURL: config.API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': config.API_KEY
    }
});

// api.interceptors.request.use(
//     async (config) => {
//         const token = await AsyncStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

api.interceptors.request.use(
  async (requestConfig) => {
    try {
      // Token
      const token = await AsyncStorage.getItem("token");
      if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }

      // Language & Currency
      const lang = (await AsyncStorage.getItem("lang")) || "en";
      const currency = (await AsyncStorage.getItem("currency")) || "SGD";

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
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const code = error.response.data.code;

      if (code === "token_expired" || code === "token_invalid" || code === "token_missing") {
        // 1. clear async storage
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");

        // 2. redirect ke login
        if (navigationRef.isReady()) {
            navigationRef.navigate("Auth", { screen: "Login" });
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;