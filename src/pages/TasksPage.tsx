import React, { useEffect, useState } from 'react';

import ClosedTasksChart from '../components/ClosedTasksChart.tsx';
import {Task, getAllDesigners} from "../apis/apiDesigner.ts";

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

    if (loading) {
        return <h3>Загрузка...</h3>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(tasks)

    return (
        <div>
            <h1>Задачи</h1>
            <ClosedTasksChart tasks={tasks} />
        </div>
    );
};

export default TaskPage;

