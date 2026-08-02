import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { apiService } from "@shared/api";
import { UserLogin } from "@shared/types";

/**
 * Replaces contexts/AuthContext.tsx. Deliberately does NOT use zustand's
 * `persist` middleware: the token moves to expo-secure-store (sensitive),
 * while `user` keeps writing to the same "user" AsyncStorage key the old
 * context used, because a few not-yet-migrated screens (HomeScreen) still
 * read that key directly. A single `persist` blob under a new key would
 * silently break those reads until their own migration phase. `hydrate()`
 * replaces the old context's mount-time `loadToken()` effect.
 */
interface AuthState {
  isAuthorized: boolean;
  user: UserLogin | null;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  login: (token: string, user: UserLogin) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthorized: false,
  user: null,
  isHydrated: false,

  hydrate: async () => {
    const [token, userJson] = await Promise.all([
      SecureStore.getItemAsync("token"),
      AsyncStorage.getItem("user"),
    ]);

    set({
      isAuthorized: !!token,
      user: userJson ? JSON.parse(userJson) : null,
      isHydrated: true,
    });
  },

  login: async (token, user) => {
    await SecureStore.setItemAsync("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    set({ isAuthorized: true, user });
  },

  logout: async () => {
    try {
      await apiService.post("v1/auth/logout");
    } catch (error) {
      // Server-side logout failing must not leave the user stuck
      // "logged in" locally with a token the server has already
      // invalidated — the local session clears regardless (finally).
      console.error("Server logout request failed:", error);
    } finally {
      await SecureStore.deleteItemAsync("token");
      await AsyncStorage.removeItem("user");
      set({ isAuthorized: false, user: null });
    }
  },
}));
