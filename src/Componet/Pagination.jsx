import React from 'react'
import '../css/MarketPage.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const groupSize = 5
  const currentGroup = Math.ceil(currentPage / groupSize)
  const startPage = (currentGroup - 1) * groupSize + 1
  const endPage = Math.min(startPage + groupSize - 1, totalPages)

  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className='pagination'>
      <button
        className='page-btn'
        onClick={() => onPageChange(startPage - 1)}
        disabled={startPage === 1}
      >
        &lt;
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={`page-btn ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className='page-btn'
        onClick={() => onPageChange(endPage + 1)}
        disabled={endPage === totalPages}
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination
