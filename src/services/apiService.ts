/**
 * @deprecated Compatibility shim for screens not yet migrated to their
 * feature folder. Note the get() signature below forwards `params` as the
 * raw axios request config, not as query params — every current call site
 * already passes `{ params: {...} }` for that reason, so it "works" by
 * accident. The typed replacement (src/shared/api/apiService.ts) has a real
 * `get<T>(url, params?)` signature — new code should use that, not this.
 * Delete this file once nothing imports from "../../services/apiService"
 * anymore (tracked in the Phase 14 dead-code sweep).
 */
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

  post: async (url: string, data = {}, params = {}) => {
    try {
      const response = await api.post(url, data, { params });
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
