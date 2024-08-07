import axios from 'axios';

export interface Designer {
    avatar: string;
    username: string;
    email: string;
    status: string;
    thumbnails: {
        avatar: string;
        avatar_2x: string;
    };
    issues: {
        id: string;
        key: string;
        date_created: string;
        date_started_by_designer: string;
        date_finished_by_designer: string;
        status: string;
    }[];
}

export interface Project {
    id: string;
    name: string;
    key: string;
}

export async function fetchAllDesigners(): Promise<Designer[]> {
    try {
        const baseUrl = 'https://b460d29261043f58.mokky.dev/designers/';
        const response = await axios.get(baseUrl);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching designers:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching designers:', error);
        return [];
    }
}

export async function fetchAllProjects(): Promise<Project[]> {
    try {
        const baseUrl = 'https://b460d29261043f58.mokky.dev/project/';
        const response = await axios.get(baseUrl);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error fetching projects:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}
