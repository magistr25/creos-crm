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
                    <Link to="/creos-crm/" className={location.pathname === "/creos-crm/" ? "active" : ""}>{t('Main')}</Link>
                </li>
                <li>
                    <Link to="/creos-crm/tasks" className={location.pathname === "/creos-crm/tasks" ? "active" : ""}>{t('Tasks')}</Link>
                </li>
                <li>
                    <Link to="/creos-crm/designers" className={location.pathname === "/creos-crm/designers" ? "active" : ""}>{t('Designers')}</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
