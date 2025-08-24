import React from 'react';
import '../css/SearchBar.css';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      className='searchInput'
      type='text'
      placeholder='검색할 상품을 입력해주세요'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
