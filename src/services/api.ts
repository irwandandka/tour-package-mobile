import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

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

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;