import axios from "axios";
import {Comment} from "../services/Comment.ts";

export const fetchComments = async (): Promise<Comment[]> => {
    try {
        const response = await axios.get<Comment[]>('https://b460d29261043f58.mokky.dev/comments/');
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


