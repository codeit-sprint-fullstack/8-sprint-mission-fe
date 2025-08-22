import logo_img from '../../../images/logo_img.svg';
import style from './Logo.module.css';

function Logo() {
  return (
    <a href="/" className={style.logo}>
      <img src={logo_img} alt="Logo" />
    </a>
  );
}

export default Logo;