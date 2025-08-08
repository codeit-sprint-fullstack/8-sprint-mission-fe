import Logo from './Logo/Logo';
import Navigator from './Navigator/Navigator';
import style from './Header.module.scss';

function Header() {
    return (
        <header className={style.header}>
            <div className={style.container}>
                <Logo />
                <Navigator />
                <a href="/login" className={style.loginBtn}>로그인</a>
            </div>
        </header>
    );
}

export default Header;