import axios from "axios";
import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

api.interceptors.request.use(
    async (config) => {
        // Contoh: ambil token dari storage
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;