import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDesigners, setSortKey, setDesigners, setFilterStatus } from './redux/designersSlice';
import { RootState, AppDispatch } from './redux/store';
import { handleSortChange, handleSortChangeDefault } from './utils/handleSortChange';
import './DesignersTable.css';

export const DesignersTable: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { designers, loading, error, sortKey, filterStatus } = useSelector((state: RootState) => state.designers);

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

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilterStatus(e.target.value));
    };

    const filteredDesigners = designers.filter((designer) => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'inProgress') return designer.issues.some(issue => issue.status === 'In Progress');
        if (filterStatus === 'done') return designer.issues.some(issue => issue.status === 'Done');
        return true;
    });

    return (
        <div className="table-container">
            <div className="controls-container">
                <label htmlFor="sort">Сортировка по: </label>
                <select id="sort" value={sortKey} onChange={handleSort}>
                    <option value="username">Имя</option>
                    <option value="email">Почта</option>
                </select>
                <label htmlFor="filter">Фильтр по статусу: </label>
                <select id="filter" value={filterStatus} onChange={handleFilter}>
                    <option value="all">Все</option>
                    <option value="inProgress">В процессе</option>
                    <option value="done">Закрытые</option>
                </select>
            </div>
            {loading && <h3>Загрузка...</h3>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && filteredDesigners.length > 0 && (
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
                    {filteredDesigners.map((designer, index) => (
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
