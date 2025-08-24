import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import style from "./Header.module.css";
import Logo from "../Atoms/Logo";
import BasicButton from "../Atoms/BasicButton";

function FreeBoard() {
  //임시 컴포넌트
  return <span>자유게시판</span>;
}
function Marketplace() {
  //임시 컴포넌트
  return <span>중고마켓</span>;
}

function Header() {
  const isMobile = useMediaQuery({ maxWidth: 743 });

  let logoSize = "small";
  if (isMobile) logoSize = "tiny"; // Mobile

  return (
    <header className={style.header}>
      <div className={style.headerWrap}>
        <div className={style.headerLeft}>
          <Link to="/">
            <Logo size={logoSize} />
          </Link>
          <FreeBoard />
          <Marketplace />
        </div>
        <Link to="/login">
          <BasicButton
            name="로그인"
            widthSize="88px"
            heightSize="42px"
            fontSize="16px"
            shape="square"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
