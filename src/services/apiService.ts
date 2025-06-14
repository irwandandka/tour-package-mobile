import api from "./api";

const apiService = {
    get: async (url: string, params = {}) => {
        try {
            const response = await api.get(url, params);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    post: async (url: string, data = {}) => {
        try {
            const response = await api.post(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    put: async (url: string, data = {}) => {
        try {
            const response = await api.put(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    delete: async (url: string) => {
        try {
            const response = await api.delete(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default apiService;
