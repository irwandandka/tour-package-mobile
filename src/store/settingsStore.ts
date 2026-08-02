import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";

/**
 * Language/currency, foundation for Phase 6. Reads/writes the same "lang"
 * and "currency" AsyncStorage keys App.tsx, LanguageScreen, and the API
 * client interceptor already use directly today, so nothing drifts even
 * before those call sites switch to this store in their own phase.
 */
interface SettingsState {
  language: string;
  currency: string;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  setLanguage: (language: string) => Promise<void>;
  setCurrency: (currency: string) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: "en",
  currency: "IDR",
  isHydrated: false,

  hydrate: async () => {
    const [language, currency] = await Promise.all([
      AsyncStorage.getItem("lang"),
      AsyncStorage.getItem("currency"),
    ]);

    if (!language) {
      await AsyncStorage.setItem("lang", "en");
    }

    set({
      language: language || "en",
      currency: currency || "IDR",
      isHydrated: true,
    });
  },

  setLanguage: async (language) => {
    await AsyncStorage.setItem("lang", language);
    await i18n.changeLanguage(language);
    set({ language });
  },

  setCurrency: async (currency) => {
    await AsyncStorage.setItem("currency", currency);
    set({ currency });
  },
}));
