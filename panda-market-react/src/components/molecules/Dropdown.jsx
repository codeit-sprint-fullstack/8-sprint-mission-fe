import { useRef, useState } from 'react';
import styles from '../../styles/components/molecules/Dropdown.module.css';
import { useWindowWidth } from '../../lib/hooks/useWindowWidth';
import { useOutsideClick } from '../../lib/hooks/useOutsideClick';

export function Dropdown({ onClick, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const windowWidth = useWindowWidth();

  // 드롭다운 버튼 클릭 시 옵션 토글 함수
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  // 드롭다운 옵션 클릭 시 value값 전달 및 옵션 닫기
  const handleClickSelectOption = (e) => {
    onClick(e.target.value);
    setSelectedOption(e.target.innerText);
    setIsOpen(false);
  };

  // 외부 클릭 시 드롭다운 닫기
  const divRef = useRef(null);
  useOutsideClick(divRef, () => setIsOpen(false));

  return (
    <div ref={divRef} className={`${styles.dropdownWrapper} ${className}`}>
      <button
        className={`${styles.dropdownButton} ${isOpen ? styles.dropdownButtonActive : ''}`}
        onClick={handleClick}
      >
        {windowWidth > 743 ? (
          selectedOption
        ) : (
          <img src="/product-list/dropdown-icon.svg" alt="드롭다운" />
        )}
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
