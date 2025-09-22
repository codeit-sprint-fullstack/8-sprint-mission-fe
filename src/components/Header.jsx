import Image from "next/image";
import brandLogo from "../../public/brandLogo.svg";
import Button from "@/components/Button.jsx";
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
      <Button type="login" />
    </div>
  );
};

export default Header;
