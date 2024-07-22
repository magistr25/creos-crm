import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { processData, getMonthData } from '../utils/dataProcessing.ts';
import {useTranslation} from "react-i18next";

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
    const { t} = useTranslation();

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

    const [statusData, setStatusData] = useState<{ [key: string]: number }>({});
    const [numCharts, setNumCharts] = useState<number>(2);

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
                // text: t('Percentage of all tasks statuses'),
            },
        },
    };

    return (
        <div style={{display: 'flex'}} >
            <div className="card diagramma" style={{ height: '100%', marginLeft: '25px', display: 'inline-block' }}>
                <div>
                    <h3 style={{textAlign: 'center'}}>{t('Task status ratio in percentages')}</h3>
                    <Pie data={pieData} options={pieOptions} />
                </div>
            </div>
            <div className="charts-wrapper" style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '20px',
                marginBottom: '20px',
                width: '100%'
            }}>
                <div className='finans' style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px',
                    marginBottom: '10px',
                    width: '100%',
                }}>
                    <h2 style={{ paddingLeft: '100px'}}>{t('Financial performance')}</h2>
                    <div style={{width: '100%'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <label htmlFor="numCharts" style={{ paddingLeft: '50px', paddingRight:'10px'}}>{t('Choose the number of weeks:')}</label>
                            <select id="numCharts" value={numCharts}
                                    onChange={(e) => setNumCharts(Number(e.target.value))}>
                                <option value={1}>{t('4 weeks')}</option>
                                <option value={2}>{t('8 weeks')}</option>
                                <option value={3}>{t('12 weeks')}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="chart-container" >
                    {numCharts >= 1 && (
                        <div className="card chart" style={{color: 'black', marginBottom: '10px'}}>
                            <h3 style={{textAlign: 'center'}}>{t('Finances, current month')}</h3>
                            <Bar data={{labels: currentMonthData.labels, datasets: currentMonthData.datasets}}
                                 options={barOptions}/>
                        </div>
                    )}
                    {numCharts >= 2 && (
                        <div className="card chart" style={{ color: 'black', marginBottom: '10px' }}>
                            <h3>{t('Finances, last month')}</h3>
                            <Bar data={{ labels: lastMonthData.labels, datasets: lastMonthData.datasets }} options={barOptions} />
                        </div>
                    )}
                    {numCharts >= 3 && (
                        <div className="card chart" style={{ color: 'black' }}>
                            <h3>{t('Finances, month before last')}</h3>
                            <Bar data={{ labels: previousMonthData.labels, datasets: previousMonthData.datasets }} options={barOptions} />
                        </div>
                    )}
                    {numCharts < 3 && <div className="card chart-placeholder"></div>}
                    {numCharts < 2 && <div className="card chart-placeholder"></div>}
                </div>
            </div>
        </div>
    );
};

export default ClosedTasksChart;
