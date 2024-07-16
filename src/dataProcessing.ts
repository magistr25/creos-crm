import { getISOWeek, subHours, startOfMonth, endOfMonth, eachWeekOfInterval } from 'date-fns';

export const getWorkingWeek = (dateString: string): number => {
    const date = new Date(dateString);
    const shiftedDate = subHours(date, 11);
    return getISOWeek(shiftedDate);
};

type Task = {
    date_created: string;
    date_finished: string | null;
    received_from_client: number;
    send_to_account_manager: number;
    send_to_designer: number;
    send_to_project_manager: number;
    status: string;
};

export const processData = (tasks: Task[]) => {
    const weeksData: { [key: number]: { income: number; expenses: number; profit: number } } = {};

    tasks.forEach(task => {
        if (task.status === 'Done') {
            const week = getWorkingWeek(task.date_finished || task.date_created); // Используем дату завершения или создания
            if (!weeksData[week]) {
                weeksData[week] = { income: 0, expenses: 0, profit: 0 };
            }

            weeksData[week].income += task.received_from_client;
            weeksData[week].expenses += task.send_to_account_manager + task.send_to_designer + task.send_to_project_manager;
            weeksData[week].profit = weeksData[week].income - weeksData[week].expenses;
        }
    });

    return weeksData;
};

export const getLastMonthData = (data: { [key: number]: { income: number; expenses: number; profit: number } }) => {
    const labels = Object.keys(data).slice(-8, -4); // Предыдущие 4 недели
    return {
        labels: labels.map((_, idx) => `${idx + 1}`),
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

export const getCurrentMonthData = (data: { [key: number]: { income: number; expenses: number; profit: number } }) => {
    const currentDate = new Date();
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 }).map(date => getISOWeek(date));

    const labels = weeks.slice(0, 4).map((week, idx) => (data[week] ? `${idx + 1}` : `${idx + 1}`));
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
                data: labels.map(week => {
                    const weekNumber = parseInt(week);
                    return data[weeks[weekNumber - 1]] ? data[weeks[weekNumber - 1]].income : 0;
                }),
            },
            {
                label: 'Расходы',
                backgroundColor: 'rgba(246, 178, 107)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 159, 64, 0.8)',
                hoverBorderColor: 'rgba(255, 159, 64, 1)',
                data: labels.map(week => {
                    const weekNumber = parseInt(week);
                    return data[weeks[weekNumber - 1]] ? data[weeks[weekNumber - 1]].expenses : 0;
                }),
            },
            {
                label: 'Прибыль',
                backgroundColor: 'rgba(106, 168, 79)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: labels.map(week => {
                    const weekNumber = parseInt(week);
                    return data[weeks[weekNumber - 1]] ? data[weeks[weekNumber - 1]].profit : 0;
                }),
            },
        ],
    };
};
