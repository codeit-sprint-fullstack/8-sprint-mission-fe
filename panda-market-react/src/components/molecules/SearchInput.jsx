import styles from '../../styles/components/molecules/SearchInput.module.css';

export function SearchInput({
  name,
  value,
  placeholder = '',
  onChange,
  onClick = () => {},
  onKeyDown = () => {},
}) {
  return (
    <div className={styles.searchInputWrapper}>
      <button className={styles.searchButton} onClick={onClick}>
        <img src="/product-list/search-icon.svg" alt="검색" />
      </button>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
