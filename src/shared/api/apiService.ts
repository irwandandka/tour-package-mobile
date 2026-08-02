import { apiClient } from "./client";

/**
 * Typed replacement for src/services/apiService.ts, used by new feature code
 * from Phase 7 onward. The old apiService.get(url, params) forwarded `params`
 * as the raw axios request config instead of `{ params }` — every existing
 * call site happens to already pass `{ params: {...} } }` as that argument,
 * which is what made it work by accident. This version takes real query
 * params and wraps them correctly, so it is NOT a drop-in replacement for the
 * old signature — screens switch to this as part of their own migration
 * phase, not by search-and-replace.
 */
export const apiService = {
  get: async <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
    const response = await apiClient.get<T>(url, { params });
    return response.data;
  },

  post: async <T>(
    url: string,
    data?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ): Promise<T> => {
    const response = await apiClient.post<T>(url, data, { params });
    return response.data;
  },

  put: async <T>(url: string, data?: Record<string, unknown>): Promise<T> => {
    const response = await apiClient.put<T>(url, data);
    return response.data;
  },

  delete: async <T>(url: string): Promise<T> => {
    const response = await apiClient.delete<T>(url);
    return response.data;
  },
};
