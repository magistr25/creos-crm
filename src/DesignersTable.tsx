import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDesigners, setSortKey, setDesigners, setFilterStatusClosed, setFilterStatusInProgress } from './redux/designersSlice';
import { RootState, AppDispatch } from './redux/store';
import { handleSortChange, handleSortChangeDefault } from './utils/handleSortChange';
import './DesignersTable.css';

export const DesignersTable: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { designers, loading, error, sortKey, filterStatusClosed, filterStatusInProgress } = useSelector((state: RootState) => state.designers);

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

    const handleFilterClosed = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilterStatusClosed(e.target.value));
    };

    const handleFilterInProgress = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilterStatusInProgress(e.target.value));
    };

    const filteredDesigners = designers.filter((designer) => {
        let closedFilter = filterStatusClosed === 'all' || designer.issues.filter(issue => issue.status === 'Done').length.toString() === filterStatusClosed;
        let inProgressFilter = filterStatusInProgress === 'all' || designer.issues.filter(issue => issue.status === 'In Progress').length.toString() === filterStatusInProgress;
        return closedFilter && inProgressFilter;
    });

    const designersDoneQ = designers.map(designer => designer.issues.filter(issue => issue.status === 'Done').length).sort((a, b) => a - b);
    const uniqueClosed = new Set(designersDoneQ);

    const designersInProgressQ = designers.map(designer => designer.issues.filter(issue => issue.status === 'In Progress').length).sort((a, b) => a - b);
    const uniqueInProgress = new Set(designersInProgressQ);

    return (
        <div className="table-container">
            <div className="controls-container">
                <label htmlFor="sort">Сортировка по: </label>
                <select id="sort" value={sortKey} onChange={handleSort}>
                    <option value="username">Имя</option>
                    <option value="email">Почта</option>
                </select>
                <label htmlFor="filterClosed">Количество закрытых: </label>
                <select id="filterClosed" value={filterStatusClosed} onChange={handleFilterClosed}>
                    <option value="all">Все</option>
                    {Array.from(uniqueClosed).map((el, index) => (
                        <option key={index} value={el.toString()}>{el}</option>
                    ))}
                </select>
                <label htmlFor="filterInProgress">Количество в процессе: </label>
                <select id="filterInProgress" value={filterStatusInProgress} onChange={handleFilterInProgress}>
                    <option value="all">Все</option>
                    {Array.from(uniqueInProgress).map((el, index) => (
                        <option key={index} value={el.toString()}>{el}</option>
                    ))}
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
