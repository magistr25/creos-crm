import React, { useState } from 'react';
import { fetchAllDesigners, Designer } from './utils/fetchAllDesigners';
import './DesignersTable.css';

export const DesignersTable: React.FC = () => {
    const [designers, setDesigners] = useState<Designer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleButtonClick = () => {
        setLoading(true);
        fetchAllDesigners()
            .then((data) => {
                setDesigners(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    return (
        <div className="table-container">
            <button className="load-button" onClick={handleButtonClick}>Load Designers</button>
            {loading && <p>Loading...</p>}
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
