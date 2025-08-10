import style from './Navigator.module.css';

function Nav() {
  return (
    <nav className={style.navigator}>
      <a href="/">자유게시판</a>
      <a href="/">중고마켓</a>
    </nav>
  );
}

export default Nav;
