// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import id from './locales/id/translation.json';

i18n
  .use(initReactI18next) // ⬅️ ini WAJIB
  .init({
    fallbackLng: 'en',
    lng: 'en',
    compatibilityJSON: 'v3', // buat React Native
    resources: {
      en: { translation: en },
      id: { translation: id },
    },
    interpolation: {
      escapeValue: false, // react sudah handle XSS
    },
  });

export default i18n;
