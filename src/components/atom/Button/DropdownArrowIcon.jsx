// src/components/atom/Icons/DropdownArrowIcon.jsx
import "./DropdownArrowIcon.css";

function DropdownArrowIcon({ 
  size = 16, 
  className = "" 
}) {
  return (
    <span className={`dropdownArrowIcon ${className}`}>
      <img 
        src="/images/dropDownArrow.svg" 
        alt="dropdown arrow"
        width={size}
        height={size}
      />
    </span>
  );
}

export default DropdownArrowIcon;