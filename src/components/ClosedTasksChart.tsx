import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { processData, getMonthData } from '../utils/dataProcessing.ts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels, ArcElement);

type Task = {
    date_created: string;
    date_finished: string | null;
    received_from_client: number;
    send_to_account_manager: number;
    send_to_designer: number;
    send_to_project_manager: number;
    status: string;
};

const ClosedTasksChart: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    const data = processData(tasks);

    const currentMonthData = getMonthData(data, 0); // текущий месяц
    const lastMonthData = getMonthData(data, 1); // прошлый месяц
    const previousMonthData = getMonthData(data, 2); // позапрошлый месяц

    const barOptions = {
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    // Обработка данных для круговой диаграммы
    const [statusData, setStatusData] = useState<{ [key: string]: number }>({});
    const [numCharts, setNumCharts] = useState<number>(2); // Новое состояние для количества графиков

    useEffect(() => {
        const statusCounts: { [key: string]: number } = {};
        tasks.forEach(task => {
            const status = task.status;
            if (!statusCounts[status]) {
                statusCounts[status] = 0;
            }
            statusCounts[status] += 1;
        });
        setStatusData(statusCounts);
    }, [tasks]);

    const pieData = {
        labels: Object.keys(statusData),
        datasets: [
            {
                data: Object.values(statusData),
                backgroundColor: ['rgba(66, 133, 244, 0.6)', 'rgba(246, 178, 107, 0.6)', 'rgba(106, 168, 79, 0.6)'],
                borderColor: ['rgba(66, 133, 244, 1)', 'rgba(246, 178, 107, 1)', 'rgba(106, 168, 79, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            datalabels: {
                formatter: (value: number, context: any) => {
                    const total = context.dataset.data.reduce((acc: number, val: number) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                    return percentage;
                },
                color: '#fff',
            },
            title: {
                display: true,
                text: 'Процентное соотношение статусов всех задач',
            },
        },
    };

    return (
        <div>
            <div>
                <label htmlFor="numCharts">Выберите количество месяцев: </label>
                <select id="numCharts" value={numCharts} onChange={(e) => setNumCharts(Number(e.target.value))}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </div>
            {numCharts >= 1 && (
                <div>
                    <h3>Финансы, текущий месяц</h3>
                    <Bar data={{ labels: currentMonthData.labels, datasets: currentMonthData.datasets }} options={barOptions} />
                </div>
            )}
            {numCharts >= 2 && (
                <div>
                    <h3>Финансы, прошлый месяц</h3>
                    <Bar data={{ labels: lastMonthData.labels, datasets: lastMonthData.datasets }} options={barOptions} />
                </div>
            )}
            {numCharts >= 3 && (
                <div>
                    <h3>Финансы, позапрошлый месяц</h3>
                    <Bar data={{ labels: previousMonthData.labels, datasets: previousMonthData.datasets }} options={barOptions} />
                </div>
            )}
            <div>
                <h3>Процентное соотношение статусов всех задач</h3>
                <Pie data={pieData} options={pieOptions} />
            </div>
        </div>
    );
};

export default ClosedTasksChart;
