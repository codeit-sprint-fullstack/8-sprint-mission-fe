import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <header>
            <Link to="/" aria-label="판다마켓 홈으로 이동">
                <img
                    src="/images/img_panda_logo.svg"
                    alt="판다마켓 로고"
                    width={153}
                />
            </Link>

            <Link to="/login" id="loginLinkButton" className="button">
                로그인
            </Link>
        </header>
    );
}
