import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "Switch to RU": "Switch to RU",
            "Switch to EN": "Switch to EN",
            "Switch to Dark Theme": "Switch to Dark Theme",
            "Switch to Light Theme": "Switch to Light Theme",
            "Current Work Week Number": "Current Work Week Number"
        }
    },
    ru: {
        translation: {
            "Switch to РУ": "Переключиться на русский",
            "Switch to EN": "Переключиться на английский",
            "Switch to Dark Theme": "Переключиться на темную тему",
            "Switch to Light Theme": "Переключиться на светлую тему",
            "Current Work Week Number": "Текущий номер рабочей недели"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // default language
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
