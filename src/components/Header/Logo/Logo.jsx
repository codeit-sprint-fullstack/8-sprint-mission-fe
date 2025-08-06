import ic_pandamarket from '@images/ic_pandamarket.svg';
import style from './Logo.module.scss';

function Logo() {
    return (
        <a href="/" className={style.logo}>
            <img src={ic_pandamarket} alt='판다마켓 아이콘' className={style.icon} />
            <p>판다마켓</p>
        </a>
    );
}

export default Logo;