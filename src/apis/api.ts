import axios from "axios";
import {Comment} from "../servises/Comment.ts";
import {Designer, DesignerResponse} from "../servises/Designer.ts";

export const apiClient = axios.create({
    baseURL: 'https://sandbox.creos.me/api/v1/',
});

export const fetchComments = async (): Promise<Comment[]> => {
    try {
        const response = await axios.get<Comment[]>('https://sandbox.creos.me/api/v1/comment/');
        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('Ошибка при получении комментариев');
        }
        const commentsData = response.data;
        commentsData.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
        return commentsData.slice(0, 10);
    } catch (error) {
        console.error('Ошибка:', error);
        return [];
    }
};

export const getAllDesigners = async (): Promise<Designer[]> => {
    let allDesigners: Designer[] = [];

    try {
        let nextPage: string | null = 'https://sandbox.creos.me/api/v1/designer/';

        while (nextPage) {
            const response:any = await axios.get<DesignerResponse>(nextPage);

            if (!response || !Array.isArray(response.data.results)) {
                throw new Error('Ошибка при получении дизайнеров');
            }

            allDesigners = [...allDesigners, ...response.data.results];
            nextPage = response.data.next;
        }

        allDesigners.sort((a, b) => a.username.localeCompare(b.username));
        return allDesigners;
    } catch (error) {
        console.error('Error fetching designers:', error);
        return [];
    }
};
