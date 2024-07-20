import React, { useEffect, useState } from 'react';
import ClosedTasksChart from '../components/ClosedTasksChart.tsx';
import { Task, getAllDesigners } from "../apis/apiDesigner.ts";

const TaskPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getAllDesigners();
                setTasks(data);
                setLoading(false);
            } catch (err) {
                setError('Ошибка при загрузке данных');
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading) {
        return <h3 className="loading">Загрузка...</h3>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="content">
            <h1 style={{marginLeft:'80px'}}>Статистика компании</h1>
            <div className="chart-container">
                <ClosedTasksChart tasks={tasks} />
            </div>
        </div>
    );
};

export default TaskPage;
