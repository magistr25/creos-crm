import axios from 'axios';

interface Designer {
    avatar: string;
    username: string;
    email: string;
    tasks_closed: number;
    tasks_in_progress: number;
}

interface ApiResponse {
    results: Designer[];
    next: string | null;
    previous: string | null;
}

async function fetchAllDesigners(): Promise<Designer[]> {
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

export async function main(): Promise<void> {
    try {
        const designers = await fetchAllDesigners();
        console.log(designers.length);  // Ожидается 256
        console.log(designers);
    } catch (error) {
        console.error('Error fetching designers:', error);
    }
}

