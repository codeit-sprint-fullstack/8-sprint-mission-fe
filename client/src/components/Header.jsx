import { Link } from "react-router-dom";
import pandaLogo from "../assets/pandaLogo.svg";
import styles from "../styles/Header.module.scss";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <Link to="/">
          <img src={pandaLogo} alt="pandaLogo" />
        </Link>
        <div className={styles.navMenu}>
          <div>자유게시판</div>
          <div>중고마켓</div>
        </div>
      </div>
      <button>로그인</button>
    </div>
  );
}

export default Header;
