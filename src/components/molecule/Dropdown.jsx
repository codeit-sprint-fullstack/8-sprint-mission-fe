// src/components/molecule/Dropdown.jsx
import { useState, useEffect, useRef } from 'react';
import './Dropdown.css';

function Dropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = "선택하세요",
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const selectedOption = options.find(opt => opt.value === value);
  
  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className={`dropdownContainer ${className}`} 
      ref={dropdownRef}
    >
      <button 
        className={`dropdownButton ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
        type="button"
      >
        <span className="dropdownText">
          {selectedOption?.label || placeholder}
        </span>
        <img 
          src="/images/dropDownArrow.svg" 
          alt="dropdown arrow"
          className={`dropdownArrowIcon ${isOpen ? 'rotated' : ''}`}
          width="12"
          height="12"
        />
      </button>
      
      {isOpen && (
        <div className="dropdownMenu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdownOption ${value === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {value === option.value && (
                <span className="checkmark">✓</span>
              )}
              <span className="optionText">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;