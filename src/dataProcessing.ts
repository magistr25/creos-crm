import { getISOWeek, subHours } from 'date-fns';

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
