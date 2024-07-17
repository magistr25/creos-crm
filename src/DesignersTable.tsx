import React, { useState, useEffect } from 'react';
import { fetchAllDesigners, Designer } from './utils/fetchAllDesigners';
import {handleSortChange, handleSortChangeDefault} from './utils/handleSortChange';
import './DesignersTable.css';

export const DesignersTable: React.FC = () => {
    const [designers, setDesigners] = useState<Designer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<keyof Designer>('username');


    useEffect(() => {
        setLoading(true);
        fetchAllDesigners()
            .then((designers) => {
                handleSortChangeDefault(designers, setDesigners);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="table-container">
            <div className="sort-container">
                <label htmlFor="sort">Сортировка по: </label>
                <select
                    id="sort"
                    value={sortKey}
                    onChange={(e) => handleSortChange(e, designers, setSortKey, setDesigners)}
                >
                    <option value="username">Имя</option>
                    <option value="email">Почта</option>
                </select>
            </div>
            {loading && <h3>Загрузка...</h3>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && designers.length > 0 && (
                <table className="designers-table">
                    <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th className="tasks-centered">Tasks Closed</th>
                        <th className="tasks-centered">Tasks In Progress</th>
                    </tr>
                    </thead>
                    <tbody>
                    {designers.map((designer, index) => (
                        <tr key={index}>
                            <td><img src={designer.avatar} alt="avatar" width="50" /></td>
                            <td>{designer.username}</td>
                            <td>{designer.email}</td>
                            <td className="tasks-centered">{designer.issues.filter(issue => issue.status === 'Done').length}</td>
                            <td className="tasks-centered">{designer.issues.filter(issue => issue.status === 'In Progress').length}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
