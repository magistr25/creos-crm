import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "Switch to RU": "Switch to RU",
            "Switch to EN": "Switch to EN",
            "Switch to Dark Theme": "Switch to Dark Theme",
            "Switch to Light Theme": "Switch to Light Theme",
            "Current Work Week Number": "Current Work Week Number",
            "Main": "Main",
            "Tasks": "Tasks",
            "Designers": "Designers",
            "Top 10 designers": "Top 10 designers",
            "Median time:": "Median time: ",
            "Tasks completed:": "Tasks completed: ",
            "User's comments": "User\'s comments",
            "minute": "minute",
            "minutes": "minutes",
            "minutes ": "minutes",
            "hour": "hour",
            "hours": "hours",
            "hours ": "hours",
            "day": "day",
            "days": "days",
            "days ": "days",
            "just now": "just now",
            " ago": " ago",
        }
    },
    ru: {
        translation: {
            "Switch to RU": "Переключиться на русский",
            "Switch to EN": "Переключиться на английский",
            "Switch to Dark Theme": "Переключиться на темную тему",
            "Switch to Light Theme": "Переключиться на светлую тему",
            "Current Work Week Number": "Текущий номер рабочей недели",
            "Main": "Главная",
            "Tasks": "Задачи",
            "Designers": "Дизайнеры",
            "Top 10 designers": "Топ 10 дизайнеров",
            "Median time:": "Медианное время: ",
            "Tasks completed:": "Выполнено задач: ",
            "User's comments": "Комментарии пользователей",
            "minute": "минута",
            "minutes": "минуты",
            "minutes ": "минут",
            "hour": "час",
            "hours": "часа",
            "hours ": "часов",
            "day": "день",
            "days": "дня",
            "days ": "дней",
            "just now": "только что",
            " ago": " назад",
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
