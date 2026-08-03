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
    const [storedLanguage, currency] = await Promise.all([
      AsyncStorage.getItem("lang"),
      AsyncStorage.getItem("currency"),
    ]);

    const language = storedLanguage || "en";

    if (!storedLanguage) {
      await AsyncStorage.setItem("lang", language);
    }

    // i18next's own init defaults to "en" regardless of what was
    // previously selected — without this, a returning user's saved
    // language never actually takes effect until they reopen LanguageScreen.
    await i18n.changeLanguage(language);

    set({
      language,
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
