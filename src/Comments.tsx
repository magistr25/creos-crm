import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Designer {
    avatar: string;
    username: string;
    thumbnails: Record<string, any>;
}

interface Comment {
    id: number;
    issue: string;
    designer: Designer;
    date_created: string;
    message: string;
}

const fetchComments = async (): Promise<Comment[]> => {
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

const formatDateDistanceDetailed = (createdAt: string) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diff = Math.abs(now.getTime() - createdDate.getTime());
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const formatted = [];
    const getCorrectForm = (number: number, forms: [string, string, string]): string => {
        const n = Math.abs(number) % 100;
        const n1 = n % 10;
        if (n > 10 && n < 20) {
            return forms[2];
        }
        if (n1 > 1 && n1 < 5) {
            return forms[1];
        }
        if (n1 === 1) {
            return forms[0];
        }
        return forms[2];
    };
    if (minutes % 60 > 0) {
        formatted.push(`${minutes % 60} ${getCorrectForm(minutes % 60, ['минута', 'минуты', 'минут'])}`);
    }
    if (hours % 24 > 0) {
        formatted.push(`${hours % 24} ${getCorrectForm(hours % 24, ['час', 'часа', 'часов'])}`);
    }
    if (days > 0) {
        formatted.push(`${days} ${getCorrectForm(days, ['день', 'дня', 'дней'])}`);
    }
    if (formatted.length === 0) {
        return 'только что';
    } else {
        return formatted.join(' ') + ' назад';
    }
};



const Comments: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const getComments = async () => {
            const data = await fetchComments();
            setComments(data);
        };
        getComments();
    }, []);

    return (
        <div>
            <h1>Комментарии</h1>
            {comments.map(comment => (
                <div key={comment.id} style={{marginBottom: '20px', padding: '10px', border: '1px solid #ddd'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={comment.designer.avatar} alt={comment.designer.username}
                             style={{width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px'}}/>
                        <div>
                            <div style={{fontWeight: 'bold'}}>{comment.designer.username}</div>
                            <div style={{color: 'gray'}}>{formatDateDistanceDetailed(comment.date_created)}</div>
                        </div>
                    </div>
                    <div>
                        <div style={{fontWeight: 'bold', marginTop: '10px'}}>{comment.issue}</div>
                        <div>{comment.message}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;

