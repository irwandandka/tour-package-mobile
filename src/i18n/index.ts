import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import id from "./locales/id/translation.json";
import de from "./locales/de/translation.json";
import ja from "./locales/ja/translation.json";
import ko from "./locales/ko/translation.json";
import th from "./locales/th/translation.json";
import zhCN from "./locales/zh-CN/translation.json";

/**
 * Replaces root i18n.js, which only registered en/id in `resources` despite
 * all 7 locale files existing on disk — selecting de/ja/ko/th/zh-CN in
 * LanguageScreen silently fell back to English. All 7 are registered here.
 */
i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  // compatibilityJSON: "v3" removed — the installed i18next version only
  // types "v4" now, and none of the 7 locale files use plural key forms
  // (_plural/_one/_other) anyway, so it had no functional effect.
  resources: {
    en: { translation: en },
    id: { translation: id },
    de: { translation: de },
    ja: { translation: ja },
    ko: { translation: ko },
    th: { translation: th },
    "zh-CN": { translation: zhCN },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
