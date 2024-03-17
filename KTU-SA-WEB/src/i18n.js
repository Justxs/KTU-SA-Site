import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import intervalPlural from 'i18next-intervalplural-postprocessor';

import Backend from 'i18next-http-backend';
const browserLang = navigator.language.split('-')[0]; // Get "en" from "en-US"
const defaultLang = ['en', 'lt'].includes(browserLang) ? browserLang : 'en';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(intervalPlural)
  .use(initReactI18next)
  .init({
    lng: defaultLang,
    fallbackLng: 'lt',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18next;