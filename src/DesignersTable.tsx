import React from 'react';
import { main } from './utils/fetchAllDesigners';

export const DesignersTable: React.FC = () => {
    const handleButtonClick = () => {
        main()
            .then(() => {
                console.log('Done');
            })
            .catch((error) => {
                console.error('Error in main:', error);
            });
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Load Designers</button>
        </div>
    );
};
