import React from 'react';
import '../styles/pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };;

  return (
    <div className="pagination">
      <button onClick={goToPrev} disabled={currentPage === 1}>
        &lt;
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={num === currentPage ? 'active' : ''}
        >
          {num}
        </button>
      ))}

      <button onClick={goToNext} disabled={currentPage === totalPages}>
        &gt;
      </button>
    </div>
  );
}

export default Pagination;