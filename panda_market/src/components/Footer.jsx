import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div>@codeit - 2024</div>

                <div className="footerMenu">
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/faq">FAQ</Link>
                </div>

                <div className="socialMedia">
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="페이스북"
                    >
                        <img src="/images/ic_facebook.svg" alt="페이스북" />
                    </a>
                    <a
                        href="https://www.x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="트위터"
                    >
                        <img src="/images/ic_twitter.svg" alt="트위터" />
                    </a>
                    <a
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="유튜브"
                    >
                        <img src="/images/ic_youtube.svg" alt="유튜브" />
                    </a>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="인스타그램"
                    >
                        <img src="/images/ic_instagram.svg" alt="인스타그램" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
