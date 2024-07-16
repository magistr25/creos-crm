import React, { useEffect } from 'react';
import Comments from './Comments';
import Designers from './Designers';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { setLoading } from './redux/loadingSlice';

const Home: React.FC = () => {
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setLoading(true));
            try {
                if (Comments.fetchData && Designers.fetchData) {
                    // Запрашиваем данные для обоих компонентов
                    await Promise.all([Comments.fetchData(), Designers.fetchData()]);

                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchData();
    }, [dispatch]);

    console.log('Home render - isLoading:', isLoading);

    return (
        <div>
            {isLoading ? (
                <h2>Загрузка...</h2>
            ) : (
                <>
                    <Comments />
                    <Designers />
                </>
            )}
        </div>
    );
};

export default Home;
