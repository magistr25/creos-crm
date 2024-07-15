import React, { useEffect, useState } from 'react';
import { getAllDesigners } from './apis/apiDesigner.ts';
import { formatDistance, parseISO } from 'date-fns';

interface Designer {
    avatar: string;
    username: string;
    totalTasks: number;
    medianTime: number;
}

const calculateMedian = (times: number[]): number => {
    if (times.length === 0) return 0;
    const sorted = times.sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? (sorted[middle - 1] + sorted[middle]) / 2
        : sorted[middle];
};

const Designers: React.FC = () => {
    const [designers, setDesigners] = useState<Designer[]>([]);

    useEffect(() => {
        const fetchAndProcessData = async () => {
            try {
                const tasks = await getAllDesigners();
                const designerData: { [key: string]: { avatar: string; username: string; times: number[]; totalTasks: number } } = {};

                tasks.forEach(task => {
                    if (task.status === 'Done' && task.date_finished_by_designer && task.date_started_by_designer && task.designer) {
                        const timeTaken = (parseISO(task.date_finished_by_designer).getTime() - parseISO(task.date_started_by_designer).getTime()) / 1000;
                        if (!designerData[task.designer]) {
                            designerData[task.designer] = {
                                avatar: `https://sandbox.creos.me/media/images/avatars/${task.designer}.jpg`,
                                username: task.designer,
                                times: [],
                                totalTasks: 0,
                            };
                        }
                        designerData[task.designer].times.push(timeTaken);
                        designerData[task.designer].totalTasks += 1;
                    }
                });

                const designersArray = Object.values(designerData).map(designer => ({
                    ...designer,
                    medianTime: calculateMedian(designer.times),
                }));

                designersArray.sort((a, b) => a.medianTime - b.medianTime || b.totalTasks - a.totalTasks);

                setDesigners(designersArray.slice(0, 10));
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAndProcessData();
    }, []);

    return (
        <div>
            <h1>Топ 10 дизайнеров</h1>
            <ul>
                {designers.map(designer => (
                    <li key={designer.username}>
                        <img src={designer.avatar} alt={`${designer.username}'s avatar`} width={50} height={50} />
                        <p>Имя пользователя: {designer.username}</p>
                        <p>Медианное время выполнения: {formatDistance(0, designer.medianTime * 1000)}</p>
                        <p>Количество выполненных задач: {designer.totalTasks}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Designers;


