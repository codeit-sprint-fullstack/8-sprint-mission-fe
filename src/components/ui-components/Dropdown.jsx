import { useState } from "react";
import arrow_down from "../../assets/icon/ic_arrow_down.svg";
import style from './Dropdown.module.css';

function Dropdown({ order, onNewestClick, onBestClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const menu = order === "recent" ? "최신순" : "좋아요순";

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNewestClick = () => {
    toggleDropdown();
    onNewestClick();
  };
  const handleBestClick = () => {
    toggleDropdown();
    onBestClick();
  };

  return (
    <div className={style.dropdown}>
      <button className={style.menuBtn} onClick={toggleDropdown}>
        {menu}
        <img src={arrow_down} alt="arrow_down" />
      </button>
      {isOpen && (
        <ul className={style.menuDrop}>
          <li>
            <button className={style.menuNewest} onClick={handleNewestClick}>최신순</button>
          </li>
          <li>
            <button className={style.menuBest} onClick={handleBestClick}>좋아요순</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
