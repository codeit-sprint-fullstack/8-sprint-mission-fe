'use client';

import { useState } from 'react';
import styles from '@/styles/components/DropDownSort.module.scss';

const DropDownSort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('recent');
  const options = ['recent', 'favorite'];

  const labelMap = {
    recent: '최신순',
    favorite: '좋아요순',
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggle} className={styles.button}>
        <div className={styles.buttonWrapper}>
          <div className={styles.dropdownText}>{labelMap[selected]}</div>
          <svg
            className={styles.arrowIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.7151 15.4653C12.3975 15.7654 11.9008 15.7654 11.5832 15.4653L5.8047 10.006C5.26275 9.49404 5.6251 8.58286 6.37066 8.58286L17.9276 8.58286C18.6732 8.58286 19.0355 9.49404 18.4936 10.006L12.7151 15.4653Z"
              fill="#1F2937"
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <ul className={styles.menu}>
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`${styles.item} ${styles[opt]}`}
            >
              {labelMap[opt]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownSort;
