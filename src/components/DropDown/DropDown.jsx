import { useState } from 'react';
import style from './DropDown.module.scss';
import ic_arrow_down from './ic_arrow_down.svg';

function DropDown({ options = [{ label: 'none', value: 'none' }], onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
        onChange?.(option.value);
    };

    return (
        <div className={style.dropDown}>
            <div onClick={() => setIsOpen(!isOpen)} className={style.dropDownBox}>
                <p>{selected.label}</p>
                <img src={ic_arrow_down} />

                {isOpen && (
                    <ul className={style.options}>
                        {options.map((opt) => (
                            <li key={opt.value} onClick={() => handleSelect(opt)}>
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default DropDown;