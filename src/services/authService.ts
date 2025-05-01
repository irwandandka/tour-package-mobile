import api from "./api";

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post("/login", { email, password });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Unknown error" };
    }
};

export const register = async (email: string, password: string) => {
    try {
        const response = await api.post("/register", { email, password });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: "Unknown error" };
    }
};
