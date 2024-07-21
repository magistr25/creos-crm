// components/Paginator.tsx
import React from 'react';
import '../styles/Paginator.css';

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    handlePrevPage: () => void;
    handleNextPage: () => void;
}

const Paginator: React.FC<PaginatorProps> = ({ currentPage, totalPages, handlePrevPage, handleNextPage }) => {
    return (
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Назад</button>
            <span>{currentPage} из {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Вперед</button>
        </div>
    );
};

export default Paginator;
