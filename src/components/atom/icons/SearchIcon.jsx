// src/components/atom/SearchIcon/SearchIcon.jsx
import "./SearchIcon.css";

function SearchIcon({ 
  size = 24, 
  color = "#9ca3af", 
  className = "" 
}) {
  return (
    <span className={`searchIconWrapper ${className}`}>
      <img 
        src="/images/searchIcon.svg" 
        alt="검색 아이콘"
        width={size}
        height={size}
      />
    </span>
  );
}

export default SearchIcon;