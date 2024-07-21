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

interface ApiResponse {
    results: Designer[];
    next: string | null;
    previous: string | null;
}

export interface Project {
    id: string;
    name: string;
    key: string;
}

export async function fetchAllDesigners(): Promise<Designer[]> {
    let allDesigners: Designer[] = [];
    let page = 1;
    let next: string | null = null;
    const baseUrl = 'https://sandbox.creos.me/api/v1/designer/?limit=128&page=';

    do {
        const response = await axios.get<ApiResponse>(`${baseUrl}${page}`);
        const data = response.data;
        allDesigners = allDesigners.concat(data.results);
        next = data.next;
        page += 1;
    } while (next !== null);

    return allDesigners;
}

export async function fetchAllProjects(): Promise<Project[]> {
    try {
        const baseUrl = 'https://sandbox.creos.me/api/v1/project/';
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
