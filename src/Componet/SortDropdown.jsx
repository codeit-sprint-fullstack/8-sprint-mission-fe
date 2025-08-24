import React from 'react';
import '../css/SortDropdown.css';

const SortDropdown = ({ sort, setSort }) => {
  return (
    <button
      onClick={() => setSort('recent')}
      className={`sortBtn ${sort === 'recent' ? 'active' : ''}`}
    >
      최신순
    </button>
  );
};

export default SortDropdown;
