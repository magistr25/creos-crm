import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Главная</Link>
                </li>
                <li>
                    <Link to="/tasks">Задачи</Link>
                </li>

                <li>
                    <Link to="/designers">Страница дизайнеров</Link>
                </li>

            </ul>
        </nav>
    );
};


export default Navigation;
