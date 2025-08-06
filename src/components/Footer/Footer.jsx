import ic_facebook from '@images/ic_facebook.svg';
import ic_twitter from '@images/ic_twitter.svg';
import ic_youtube from '@images/ic_youtube.svg';
import ic_instagram from '@images/ic_instagram.svg';
import style from './Footer.module.scss';

function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <p>©codeit - 2024</p>
                <div className={style.center}>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/faq">FAQ</a>
                </div>
                <div className={style.icons}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src={ic_facebook} alt='facebook icon' /></a>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer"><img src={ic_twitter} alt='twitter icon' /></a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><img src={ic_youtube} alt='youtube icon' /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src={ic_instagram} alt='instagram icon' /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;