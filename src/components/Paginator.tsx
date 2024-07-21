// components/Paginator.tsx
import React from 'react';
import '../styles/Paginator.css';
import {useTranslation} from "react-i18next";

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    handlePrevPage: () => void;
    handleNextPage: () => void;
}

const Paginator: React.FC<PaginatorProps> = ({ currentPage, totalPages, handlePrevPage, handleNextPage }) => {
    const { t} = useTranslation();
    return (
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>{t('Back')}</button>
            <span>{currentPage} из {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>{t('Along')}</button>
        </div>
    );
};

export default Paginator;
