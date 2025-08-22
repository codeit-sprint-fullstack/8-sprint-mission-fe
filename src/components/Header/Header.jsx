import pandaLogo from '../../assets/icon/ic_panda.svg'
import style from './Header.module.css';

function Logo(){
  return (
    <a href="../" className={style.logo}>
      <img src={pandaLogo} alt='pandaLogo'/>
      <span>판다마켓</span>
    </a>
  );
} 

function FreeBoard() { //임시 컴포넌트
  return(
    <span>자유게시판</span>
  );
}
function Marketplace() { //임시 컴포넌트
  return(
    <span>중고마켓</span>
  );
}
function LoginButton() { //임시 컴포넌트
  return(
    <button className={style.loginButton}>로그인</button>
  );
}

function Header(){
  return (
    <header className={style.header}>
      <div className={style.headerWrap}>
        <div className={style.headerLeft}>
          <Logo />
          <FreeBoard />
          <Marketplace />
        </div>  
        <LoginButton />
      </div>
    </header>
  );
}

export default Header;