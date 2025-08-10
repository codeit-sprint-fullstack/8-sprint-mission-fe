// src/components/molecule/SearchInput.jsx
import "./SearchInput.css";
import SearchIcon from "../atom/Icons/SearchIcon";

function SearchInput({ 
  placeholder = "검색할 상품을 입력해주세요",
  value,
  onChange,
  onSearch,
  className = ""
}) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div className={`searchInputContainer ${className}`}>
      <div className="searchIcon">
        <SearchIcon size={24} color="#9ca3af" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        className="searchInput"
      />
    </div>
  );
}

export default SearchInput;