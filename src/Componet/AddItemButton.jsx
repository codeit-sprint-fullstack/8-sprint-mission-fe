import React from 'react';
import '../css/AddItemButton.css';

const AddItemButton = ({ onClick }) => {
  return (
    <button className='addBtn' onClick={onClick}>
      상품 등록하기
    </button>
  );
};

export default AddItemButton;
