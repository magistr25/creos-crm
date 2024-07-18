import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDesigners, setSortKey, setDesigners } from './redux/designersSlice';
import { RootState, AppDispatch } from './redux/store';
import { handleSortChange, handleSortChangeDefault } from './utils/handleSortChange';
import './DesignersTable.css';

export const DesignersTable: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { designers, loading, error, sortKey } = useSelector((state: RootState) => state.designers);

    useEffect(() => {
        dispatch(fetchDesigners()).then((result) => {
            if (fetchDesigners.fulfilled.match(result)) {
                handleSortChangeDefault(result.payload, (sortedDesigners) => {
                    dispatch(setDesigners(sortedDesigners));
                });
            }
        });
    }, [dispatch]);

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleSortChange(e, designers, (key) => dispatch(setSortKey(key)), (sortedDesigners) => dispatch(setDesigners(sortedDesigners)));
    };

    return (
        <div className="table-container">
            <div className="sort-container">
                <label htmlFor="sort">Сортировка по: </label>
                <select
                    id="sort"
                    value={sortKey}
                    onChange={handleSort}
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
