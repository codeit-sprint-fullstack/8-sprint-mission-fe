import Image from "next/image";
import brandLogo from "../../public/brandLogo.svg";
import styles from "@/styles/components/Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <Image src={brandLogo} alt="brandLogo" />
        <div className={styles.link}>
          <div className={styles.linkContent}>자유게시판</div>
          <div className={styles.linkContent}>중고마켓</div>
        </div>
      </div>
      <button className={styles.loginBtn}>로그인</button>
    </div>
  );
};

export default Header;
