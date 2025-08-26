import { Link, useLocation } from 'react-router-dom';
import style from './Navigator.module.css';

function Nav() {
  const location = useLocation();

  return (
    <nav className={style.navigator}>
      <Link to="/freepost" className={location.pathname === "/freepost" ? "active" : ""}>자유게시판</Link>
      <Link to="/items" className={location.pathname === "/items" ? "active" : ""}>중고마켓</Link>
    </nav>
  );
}

export default Nav;