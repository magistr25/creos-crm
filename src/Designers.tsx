import React, {useEffect} from 'react';
import {getAllDesigners} from "./apis/api.ts";

const Designers: React.FC = () => {

    useEffect(() => {
        const getDesigners = async () => {
            getAllDesigners().then(data => {
                console.log('All designers:', data);
            }).catch(error => {
                console.error('Error:', error);
            });
        };
        getDesigners();
    }, []);

    return (
        <div>
            <h1>Топ 10 дизайнеров</h1>

        </div>
    );
};

export default Designers;

