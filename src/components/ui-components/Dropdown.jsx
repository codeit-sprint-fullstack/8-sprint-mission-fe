import { useState } from "react";
import arrow_down from "../../assets/icon/ic_arrow_down.svg";
import './Dropdown.css';

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
    <div className="dropdown">
      <button className="menu-btn" onClick={toggleDropdown}>
        {menu}
        <img src={arrow_down} alt="arrow_down" />
      </button>
      {isOpen && (
        <ul className="menu-drop">
          <li>
            <button className="menu-newest" onClick={handleNewestClick}>최신순</button>
          </li>
          <li>
            <button className="menu-best" onClick={handleBestClick}>좋아요순</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
