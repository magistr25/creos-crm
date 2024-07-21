import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Navigation.css';

const Navigation: React.FC = () => {
    const location = useLocation();
    const { t} = useTranslation();

    return (
        <nav className="navigation">
            <ul className="breadcrumb">
                <li>
                    <Link to="/" className={location.pathname === "/" ? "active" : ""}>{t('Main')}</Link>
                </li>
                <li>
                    <Link to="/tasks" className={location.pathname === "/tasks" ? "active" : ""}>{t('Tasks')}</Link>
                </li>
                <li>
                    <Link to="/designers" className={location.pathname === "/designers" ? "active" : ""}>{t('Designers')}</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
