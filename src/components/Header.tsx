import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWeek, subHours } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import '../../i18n.ts';
import '../styles/Header.css';

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [weekNumber, setWeekNumber] = useState<number>(0);

    useEffect(() => {
        const now = new Date();
        const adjustedDate = subHours(now, 11); // Уменьшаем на 11 часов
        const week = getWeek(adjustedDate, { locale: i18n.language === 'en' ? enUS : ru });
        setWeekNumber(week);

        // Устанавливаем начальную тему
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme as 'light' | 'dark');
        document.body.classList.add(savedTheme + '-theme');
    }, [i18n.language]);

    const toggleLocale = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.classList.remove(theme + '-theme');
        document.body.classList.add(newTheme + '-theme');
        localStorage.setItem('theme', newTheme);
    };

    return (
        <header className={`header ${theme}`}>
            <Link to="/" className="logo">
                <img src={'vite.svg'} alt="Logo" className="logo-image" />
                <h3 style={{ color: 'white' }}>Creos CRM</h3>
            </Link>
            <div className="weekNumber-container">
                <p className="weekNumber">{`${t('Current Work Week Number')}: ${weekNumber}`}</p>
            </div>
            <div className="controls">
                <button className="header-button locale-button" onClick={toggleLocale}>
                    {i18n.language === 'en' ? 'RU' : 'EN'}
                </button>
                <button className="header-button theme-button" onClick={toggleTheme}>
                    {theme === 'light' ? t('Dark') : t('Light')}
                </button>
            </div>
        </header>
    );
};

export default Header;