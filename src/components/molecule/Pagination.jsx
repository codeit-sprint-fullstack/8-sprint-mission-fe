// src/components/molecule/Pagination.jsx
import { useState, useEffect, useRef } from 'react';
import './Pagination.css';

function Pagination({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  maxVisiblePages = 5, // 최대 표시할 페이지 수
  className = ""
}) {
  const dropdownRef = useRef(null);

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // 표시할 페이지 번호들 계산 (최대 5개)
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 5개 이하면 모두 표시
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    // 끝에서 부족한 경우 시작점 조정
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`paginationContainer ${className}`}>
      {/* 이전 버튼 */}
      <button 
        className={`paginationButton prevButton ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        ←
      </button>

      {/* 페이지 번호들 (최대 5개만) */}
      {visiblePages.map((page) => (
        <button
          key={page}
          className={`paginationButton pageButton ${
            page === currentPage ? 'active' : ''
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button 
        className={`paginationButton nextButton ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  );
}

export default Pagination;