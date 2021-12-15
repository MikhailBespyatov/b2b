import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationRU from '../config/locales/ru/common.json';

const resources = {
  ru: {
    translation: translationRU
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false
  },
  debug: process.env.NODE_ENV === 'development'
});

export default i18n;
