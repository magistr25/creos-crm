import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
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
            "Loading...": "Загрузка...",
            "Company statistics": "Статистика компании",
            "Percentage of all tasks statuses": "Процентное соотношение статусов всех задач",
            "Task status ratio in percentages": "Соотношение статусов задач в процентах",
            "Financial performance": "Финансовые показатели",
            "Choose the number of weeks:": "Выберите количество недель:",
            "4 weeks": "4 недели",
            "8 weeks": "8 недель",
            "12 weeks": "12 недель",
            "weeks ": "неделя ",
            "Finances, current month": "Финансы, текущий месяц",
            "Finances, last month": "Финансы, прошлый месяц",
            "Finances, month before last": "Финансы, позапрошлый месяц",
            "Incoming": "Приход",
            "Expenses": "Расходы",
            "Profit": "Прибыль",
            "Sorted by:": "Сортировка по:",
            "Number closed:": "Число закрытых:",
            "Number in progress:": "Число в процессе:",
            "Project: ": "Проект: ",
            "name": "имени",
            "email": "почте",
            "all": "все",
            "Avatar": "Аватар",
            "Username": "Имя",
            "Email": "Почта",
            "Tasks Closed": "Задач закрыто",
            "Tasks In Progress": "Задач в процессе",
            "Back": "Назад",
            "Along": "Дальше",
            "about 2 hours": "около 2 часов",
            "about 3 hours": "около 3 часов",
            "about 4 hours": "около 4 часов",
            "about 5 hours": "около 5 часов",
            "about 6 hours": "около 6 часов",
            "about 7 hours": "около 7 часов",
            "about 8 hours": "около 8 часов",
            "about 9 hours": "около 9 часов",
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
