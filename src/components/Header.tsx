import React, { useState, useEffect } from 'react';
import { getWeek, subHours } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import '../../i18n.ts';

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [weekNumber, setWeekNumber] = useState<number>(0);

    useEffect(() => {
        const now = new Date();
        const adjustedDate = subHours(now, 11); // Уменьшаем на 11 часов
        const week = getWeek(adjustedDate, { locale: i18n.language === 'en' ? enUS : ru });
        setWeekNumber(week);
    }, [i18n.language]);

    const toggleLocale = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');

    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.className = newTheme; // Добавляем класс к body для переключения темы
    };

    return (
        <header>
            <div>
                <button onClick={toggleLocale}>
                    {i18n.language === 'en' ? t('Switch to RU') : t('Switch to EN')}
                </button>
            </div>
            <div>
                <button onClick={toggleTheme}>
                    {theme === 'light' ? t('Switch to Dark Theme') : t('Switch to Light Theme')}
                </button>
            </div>
            <div >
                <span className='weekNumber'>{`${t('Current Work Week Number')}: ${weekNumber}`}</span>
            </div>
        </header>
    );
};

export default Header;

