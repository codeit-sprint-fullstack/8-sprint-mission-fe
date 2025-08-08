import { useState } from 'react';
import arrow from './ic_DownArrow.svg';
import './DropDown.module.css';

function DropDown({ options = [], onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  return (
    <div className={dropDown}>
      <div className={dropDownContainer} onClick={() => setIsOpen(!isOpen)}>
        <p>{selected.label}</p>
        <img src={arrow} alt="DropDownArrow" />

        {isOpen && (
          <ul className={options}>
              {options.map((option) => (  //오류나면 option -> opt
                  <li key={option.value} onClick={() => handleSelect(option)}>{option.label}</li>
              ))}
          </ul>
        )}

      </div>
    </div>
  );
}

export default DropDown;