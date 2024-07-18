import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation: React.FC = () => {
    const location = useLocation();

    return (
        <nav className="navigation">
            <ul className="breadcrumb">
                <li>
                    <Link to="/" className={location.pathname === "/" ? "active" : ""}>Главная</Link>
                </li>
                <li>
                    <Link to="/tasks" className={location.pathname === "/tasks" ? "active" : ""}>Задачи</Link>
                </li>
                <li>
                    <Link to="/designers" className={location.pathname === "/designers" ? "active" : ""}>Страница дизайнеров</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
