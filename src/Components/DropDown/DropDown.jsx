import { useState } from 'react';
import ic_arrow from './ic_DownArrow.svg';
import style from './DropDown.module.css';

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
    <section className={style.dropDown}>
      <div className={style.dropDownContainer} onClick={() => setIsOpen(!isOpen)}>
        <p>{selected.label}</p>
        <img src={ic_arrow} alt="DropDownArrow" />

        {isOpen && (
          <ul className={style.options}>
              {options.map((opt) => (
                  <li key={opt.value} onClick={() => handleSelect(opt)}>{opt.label}</li>
              ))}
          </ul>
        )}

      </div>
    </section>
  );
}

export default DropDown;