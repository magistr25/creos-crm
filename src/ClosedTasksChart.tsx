import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { processData } from './dataProcessing';

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

    const getLastWeeksData = (weeks: number) => {
        const labels = Object.keys(data).slice(-weeks);
        return {
            labels,
            datasets: [
                {
                    label: 'Приход',
                    backgroundColor: 'rgba(66, 133, 244)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
                    hoverBorderColor: 'rgba(54, 162, 235, 1)',
                    data: labels.map(week => data[parseInt(week)].income),
                },
                {
                    label: 'Расходы',
                    backgroundColor: 'rgba(246, 178, 107)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255, 159, 64, 0.8)',
                    hoverBorderColor: 'rgba(255, 159, 64, 1)',
                    data: labels.map(week => data[parseInt(week)].expenses),
                },
                {
                    label: 'Прибыль',
                    backgroundColor: 'rgba(106, 168, 79)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                    hoverBorderColor: 'rgba(75, 192, 192, 1)',
                    data: labels.map(week => data[parseInt(week)].profit),
                },
            ],
        };
    };

    const lastMonthData = getLastWeeksData(8).datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.slice(0, 4),
    }));

    const currentMonthData = getLastWeeksData(4);

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'График закрытых за месяц задач',
            },
        },
    };

    // Обработка данных для круговой диаграммы
    const [statusData, setStatusData] = useState<{ [key: string]: number }>({});

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
                <h3>Финансы, прошлый месяц</h3>
                <Bar data={{ labels: lastMonthData[0].data.map((_, idx) => `Неделя ${idx + 1}`), datasets: lastMonthData }} options={barOptions} />
            </div>
            <div>
                <h3>Финансы, текущий месяц</h3>
                <Bar data={currentMonthData} options={barOptions} />
            </div>
            <div>
                <h3>Процентное соотношение статусов всех задач</h3>
                <Pie data={pieData} options={pieOptions} />
            </div>
        </div>
    );
};

export default ClosedTasksChart;
