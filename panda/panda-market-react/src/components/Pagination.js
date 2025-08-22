import React from 'react';
import '../styles/pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const Max = 5;

  const windowIndex = Math.floor((currentPage - 1) / Max);
  const start = windowIndex * Max + 1;
  const end = Math.min(start + Max - 1, totalPages);

  const count = Math.max(0, end - start + 1);
  const pages = Array.from({ length: count }, (_, i) => start + i);

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