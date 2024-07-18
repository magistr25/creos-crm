import { getISOWeek, subHours, startOfMonth, endOfMonth, subMonths, eachWeekOfInterval } from 'date-fns';

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
            const week = getWorkingWeek(task.date_finished || task.date_created);
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

export const getMonthData = (data: { [key: number]: { income: number; expenses: number; profit: number } }, offset: number) => {
    const currentDate = new Date();
    const start = startOfMonth(subMonths(currentDate, offset));
    const end = endOfMonth(subMonths(currentDate, offset));

    const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });
    const relevantWeeks = weeks.slice(0, 4); // Ограничиваем количество недель до 4

    const labels = relevantWeeks.map((_, idx) => `Неделя ${idx + 1}`);
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
                data: relevantWeeks.map(week => {
                    const weekNumber = getISOWeek(week);
                    return data[weekNumber] ? data[weekNumber].income : 0;
                }),
            },
            {
                label: 'Расходы',
                backgroundColor: 'rgba(246, 178, 107)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 159, 64, 0.8)',
                hoverBorderColor: 'rgba(255, 159, 64, 1)',
                data: relevantWeeks.map(week => {
                    const weekNumber = getISOWeek(week);
                    return data[weekNumber] ? data[weekNumber].expenses : 0;
                }),
            },
            {
                label: 'Прибыль',
                backgroundColor: 'rgba(106, 168, 79)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: relevantWeeks.map(week => {
                    const weekNumber = getISOWeek(week);
                    return data[weekNumber] ? data[weekNumber].profit : 0;
                }),
            },
        ],
    };
};
