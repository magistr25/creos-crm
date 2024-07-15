import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

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
                            <div style={{color: 'gray'}}>{formatDistanceToNow(new Date(comment.date_created), {
                                addSuffix: true,
                                locale: ru
                            })}</div>
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

