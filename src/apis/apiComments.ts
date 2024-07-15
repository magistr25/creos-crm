import axios from "axios";
import {Comment} from "../servises/Comment.ts";

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


