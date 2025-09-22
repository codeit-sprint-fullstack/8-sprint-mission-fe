import Image from "next/image";
import brandLogo from "../../public/brandLogo.svg";
import styles from "@/styles/components/Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <Image src={brandLogo} alt="brandLogo" />
        <div>
          <div>자유게시판</div>
          <div>중고마켓</div>
        </div>
      </div>
      <button>로그인</button>
    </div>
  );
};

export default Header;
