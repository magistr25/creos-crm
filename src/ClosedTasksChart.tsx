import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { processData, getLastMonthData, getCurrentMonthData } from './dataProcessing';

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

    const lastMonthData = getLastMonthData(data);
    const currentMonthData = getCurrentMonthData(data);

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

    const pieData = {
        labels: ['Выполнено', 'В процессе', 'Ожидание'],
        datasets: [
            {
                label: 'Статусы задач',
                data: [12, 19, 3],
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'],
                borderWidth: 1,
            },
        ],
    };

    const pieOptions = {
        plugins: {
            datalabels: {
                color: '#fff',
                formatter: (value: number) => `${value}%`,
            },
        },
    };

    return (
        <div>
            <div>
                <h3>Финансы, прошлый месяц</h3>
                <Bar data={{ labels: lastMonthData.labels, datasets: lastMonthData.datasets }} options={barOptions} />
            </div>
            <div>
                <h3>Финансы, текущий месяц</h3>
                <Bar data={{ labels: currentMonthData.labels, datasets: currentMonthData.datasets }} options={barOptions} />
            </div>
            <div>
                <h3>Процентное соотношение статусов всех задач</h3>
                <Pie data={pieData} options={pieOptions} />
            </div>
        </div>
    );
};

export default ClosedTasksChart;
