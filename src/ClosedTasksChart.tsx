import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { processData } from './dataProcessing'; // Предполагается, что вы сохранили функции в dataProcessing.ts

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
    const [weeksToShow, setWeeksToShow] = useState(8);
    const data = processData(tasks);

    const labels = Object.keys(data).slice(-weeksToShow);
    const incomeData = labels.map(week => data[parseInt(week)].income);
    const expensesData = labels.map(week => data[parseInt(week)].expenses);
    const profitData = labels.map(week => data[parseInt(week)].profit);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Приход',
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: incomeData,
            },
            {
                label: 'Расходы',
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 159, 64, 0.8)',
                hoverBorderColor: 'rgba(255, 159, 64, 1)',
                data: expensesData,
            },
            {
                label: 'Прибыль',
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: profitData,
            },
        ],
    };

    const options = {
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

    const getWeekLabel = (week: number): string => {
        if (week === 1) return 'неделя';
        if (week >= 2 && week <= 4) return 'недели';
        return 'недель';
    };

    return (
        <div>
            <select value={weeksToShow} onChange={(e) => setWeeksToShow(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(week => (
                    <option key={week} value={week}>
                        {week} {getWeekLabel(week)}
                    </option>
                ))}
            </select>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ClosedTasksChart;
