import axios from 'axios';

export interface Task {
    date_created: string;
    date_finished: string | null;
    date_finished_by_designer: string | null;
    date_started_by_designer: string | null;
    designer: string | null;
    id: string;
    project: string;
    received_from_client: number;
    send_to_account_manager: number;
    send_to_designer: number;
    send_to_project_manager: number;
    status: string;
    summary: string;
}

export const getAllDesigners = async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>('https://b460d29261043f58.mokky.dev/issue/');
    return response.data;
};
