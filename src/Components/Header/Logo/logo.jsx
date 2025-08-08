import logo_img from './logo_img.svg';
import './Logo.module.css';

function Logo() {
  return (
    <a href="/" className="logo">
      <img src={logo_img} alt="Logo" />
    </a>
  );
}

export default Logo;
