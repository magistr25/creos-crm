import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchDesigners,
    setSortKey,
    setFilterStatusClosed,
    setFilterStatusInProgress,
    setFilterProject,
    fetchProjects,
    setDesigners, setProjects,
} from '../redux/designersSlice';
import { RootState, AppDispatch } from '../redux/store';
import { handleSortChange, handleSortChangeDefault, handleSortChangeDefaultProjects } from '../utils/handleSortChange';
import Paginator from '../components/Paginator';
import '../styles/DesignersTable.css';

const DesignersPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { designers, loading, error, sortKey, filterStatusClosed, filterStatusInProgress, projects, filterProject } = useSelector((state: RootState) => state.designers);

    const [tempFilterStatusClosed, setTempFilterStatusClosed] = useState<string>('all');
    const [tempFilterStatusInProgress, setTempFilterStatusInProgress] = useState<string>('all');
    const [tempFilterProject, setTempFilterProject] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 10;  // Размер страницы (количество элементов на странице)

    useEffect(() => {
        dispatch(fetchDesigners()).then((result) => {
            if (fetchDesigners.fulfilled.match(result)) {
                handleSortChangeDefault(result.payload, (sortedDesigners) => {
                    dispatch(setDesigners(sortedDesigners));
                });
            }
        });
        dispatch(fetchProjects()).then((result) => {
            if (fetchProjects.fulfilled.match(result)) {
                handleSortChangeDefaultProjects(result.payload, (sortedProjects) => {
                    dispatch(setProjects(sortedProjects));
                });
            }
        });
        window.scrollTo(0, 0);
    }, [dispatch]);

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleSortChange(e, designers, (key) => dispatch(setSortKey(key)), (sortedDesigners) => dispatch(setDesigners(sortedDesigners)));
        applyFilters();
    };

    const handleTempFilterClosed = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTempFilterStatusClosed(e.target.value);
        applyFilters(e.target.value, tempFilterStatusInProgress, tempFilterProject);
    };

    const handleTempFilterInProgress = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTempFilterStatusInProgress(e.target.value);
        applyFilters(tempFilterStatusClosed, e.target.value, tempFilterProject);
    };

    const handleTempFilterProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTempFilterProject(e.target.value);
        applyFilters(tempFilterStatusClosed, tempFilterStatusInProgress, e.target.value);
    };

    const applyFilters = (closed = tempFilterStatusClosed, inProgress = tempFilterStatusInProgress, project = tempFilterProject) => {
        dispatch(setFilterStatusClosed(closed));
        dispatch(setFilterStatusInProgress(inProgress));
        dispatch(setFilterProject(project));
        setCurrentPage(1); // Сброс на первую страницу после применения фильтров
    };

    const filteredByProject = designers.filter((designer) => {
        return filterProject === 'all' || designer.issues.some(issue => issue.key.replace(/-.*/, '') === filterProject);
    });

    const filteredByClosed = filteredByProject.filter((designer) => {
        return filterStatusClosed === 'all' || designer.issues.filter(issue => issue.status === 'Done').length.toString() === filterStatusClosed;
    });

    const filteredByInProgress = filteredByClosed.filter((designer) => {
        return filterStatusInProgress === 'all' || designer.issues.filter(issue => issue.status === 'In Progress').length.toString() === filterStatusInProgress;
    });

    const sortedDesigners = [...filteredByInProgress].sort((a, b) => {
        if (sortKey === 'username') {
            return a.username.localeCompare(b.username);
        } else if (sortKey === 'email') {
            return a.email.localeCompare(b.email);
        }
        return 0;
    });

    const indexOfLastDesigner = currentPage * pageSize;
    const indexOfFirstDesigner = indexOfLastDesigner - pageSize;
    const currentDesigners = sortedDesigners.slice(indexOfFirstDesigner, indexOfLastDesigner);

    const totalPages = Math.ceil(sortedDesigners.length / pageSize);

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const designersDoneQ = designers.map(designer => designer.issues.filter(issue => issue.status === 'Done').length).sort((a, b) => a - b);
    const uniqueClosed = new Set(designersDoneQ);

    const designersInProgressQ = designers.map(designer => designer.issues.filter(issue => issue.status === 'In Progress').length).sort((a, b) => a - b);
    const uniqueInProgress = new Set(designersInProgressQ);

    return (
        <div className="table-container">
            <div className="controls-container">
                <label style={{ marginRight: '5px' }} htmlFor="sort">Сортировка по: </label>
                <select style={{ marginRight: '10px' }} id="sort" value={sortKey} onChange={handleSort}>
                    <option value="username">имени</option>
                    <option value="email">почте</option>
                </select>
                <label style={{ marginRight: '5px' }} htmlFor="filterClosed">Число закрытых: </label>
                <select style={{ marginRight: '10px' }} id="filterClosed" value={tempFilterStatusClosed} onChange={handleTempFilterClosed}>
                    <option value="all">все</option>
                    {Array.from(uniqueClosed).map((el, index) => (
                        <option key={index} value={el.toString()}>{el}</option>
                    ))}
                </select>
                <label style={{ marginRight: '5px' }} htmlFor="filterInProgress">Число в процессе: </label>
                <select style={{ marginRight: '10px' }} id="filterInProgress" value={tempFilterStatusInProgress} onChange={handleTempFilterInProgress}>
                    <option value="all">все</option>
                    {Array.from(uniqueInProgress).map((el, index) => (
                        <option key={index} value={el.toString()}>{el}</option>
                    ))}
                </select>
                <label style={{ marginRight: '5px' }} htmlFor="filterProject">Проект: </label>
                <select id="filterProject" value={tempFilterProject} onChange={handleTempFilterProject}>
                    <option value="all">Все</option>
                    {projects && projects.map((project, index) => (
                        <option key={index} value={project.key}>{project.name}</option>
                    ))}
                </select>
            </div>
            {loading && <h3>Загрузка...</h3>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && currentDesigners.length > 0 && (
                <>
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
                        {currentDesigners.map((designer, index) => (
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
                    <Paginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                    />
                </>
            )}
        </div>
    );
};

export default DesignersPage;
