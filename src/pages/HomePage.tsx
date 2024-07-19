import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { setLoading } from '../redux/loadingSlice.ts';
import { fetchComments } from '../apis/apiComments.ts';
import { getAllDesigners, Task } from '../apis/apiDesigner.ts';
import { formatDistance, parseISO } from 'date-fns';

// Типы для данных
type Comment = {
    id: string;
    designer: {
        avatar: string;
        username: string;
    };
    date_created: string;
    issue: string;
    message: string;
};

interface Designer {
    avatar: string;
    username: string;
    totalTasks: number;
    medianTime: number;
}

// Функция для расчета медианы
const calculateMedian = (times: number[]): number => {
    if (times.length === 0) return 0;
    const sorted = times.sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
};

// Функция для форматирования времени
const formatDateDistanceDetailed = (createdAt: string) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diff = Math.abs(now.getTime() - createdDate.getTime());
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const formatted = [];
    const getCorrectForm = (number: number, forms: [string, string, string]): string => {
        const n = Math.abs(number) % 100;
        const n1 = n % 10;
        if (n > 10 && n < 20) {
            return forms[2];
        }
        if (n1 > 1 && n1 < 5) {
            return forms[1];
        }
        if (n1 === 1) {
            return forms[0];
        }
        return forms[2];
    };
    if (minutes % 60 > 0) {
        formatted.push(`${minutes % 60} ${getCorrectForm(minutes % 60, ['минута', 'минуты', 'минут'])}`);
    }
    if (hours % 24 > 0) {
        formatted.push(`${hours % 24} ${getCorrectForm(hours % 24, ['час', 'часа', 'часов'])}`);
    }
    if (days > 0) {
        formatted.push(`${days} ${getCorrectForm(days, ['день', 'дня', 'дней'])}`);
    }
    if (formatted.length === 0) {
        return 'только что';
    } else {
        return formatted.join(' ') + ' назад';
    }
};

// Главный компонент Home
const Home: React.FC = () => {
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const dispatch = useDispatch();
    const [comments, setComments] = useState<Comment[]>([]);
    const [designers, setDesigners] = useState<Designer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setLoading(true));
            try {
                // Запрашиваем данные для обоих компонентов
                const [fetchedComments, fetchedDesigners] = await Promise.all([
                    fetchComments(),
                    getAllDesigners(),
                ]);

                // Обработка данных для дизайнеров
                const designerData: { [key: string]: { avatar: string; username: string; times: number[]; totalTasks: number } } = {};
                fetchedDesigners.forEach((task: Task) => {
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

                setComments(fetchedComments);
                setDesigners(designersArray.slice(0, 10));
            } catch (error) {
                console.error('Error:', error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div>
            {isLoading ? (
                <h3 style={{color:'#7f88f1'}}>Загрузка...</h3>
            ) : (
                < div style={{padding: '0 50px'}}>
                    <div>
                        <h1 style={{color: '#7f88f1'}}>Топ 10 дизайнеров</h1>
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                            {designers.map(designer => (
                                <div key={designer.username} style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    width: 'calc(33% - 20px)', /* Для 3-х колонок */
                                    boxSizing: 'border-box'
                                }}>
                                    <img
                                        src={designer.avatar}
                                        alt={`${designer.username}'s avatar`}
                                        width={50}
                                        height={50}
                                        style={{
                                            borderRadius: '50%',
                                            float: 'left',
                                            marginRight: '10px'
                                        }}
                                    />
                                    <div>
                                        <p style={{margin: '0', fontWeight: 'bold'}}>{designer.username}</p>
                                        <p style={{margin: '0'}}><b>Медианное время:</b> {formatDistance(0, designer.medianTime * 1000)}</p>
                                        <p style={{margin: '0'}}><b>Выполнено задач:</b>{designer.totalTasks}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 style={{color: '#7f88f1', paddingTop: '20px'}}>Комментарии пользователей</h2>
                        {comments.map(comment => (
                            <div key={comment.id} style={{
                                marginBottom: '20px',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '8px'
                            }}>
                                <img
                                    src={comment.designer.avatar}
                                    alt={comment.designer.username}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        float: 'left',
                                        marginRight: '10px'
                                    }}
                                />
                                <div>
                                    <div style={{fontWeight: 'bold'}}>{comment.designer.username}</div>
                                    <div
                                        style={{color: 'gray'}}>{formatDateDistanceDetailed(comment.date_created)}</div>
                                    <div style={{fontWeight: 'bold', marginTop: '10px'}}>{comment.issue}</div>
                                    <div>{comment.message}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
