import { useState } from 'react';
import styles from '../../styles/components/molecules/Dropdown.module.css';

export function Dropdown({ onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickSelectOption = (e) => {
    onClick(e.target.value);
    setSelectedOption(e.target.innerText);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownWrapper}>
      <button
        className={`${styles.dropdownButton} ${isOpen ? styles.dropdownButtonActive : ''}`}
        onClick={handleClick}
      >
        {selectedOption}
      </button>

      {isOpen && (
        <ul className={styles.dropdownListWrapper}>
          <li>
            <button onClick={handleClickSelectOption} value="recent">
              최신순
            </button>
          </li>
          <li>
            <button onClick={handleClickSelectOption} value="favorite">
              좋아요순
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
