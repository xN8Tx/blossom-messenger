import i18n from 'i18next';
import XHR from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const options = {
  order: ['localStorage', 'navigator'],
  lookupQuerystring: 'i18nextLng',
};

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    detection: options,
    supportedLngs: ['en', 'ru', 'kt'],
  });
