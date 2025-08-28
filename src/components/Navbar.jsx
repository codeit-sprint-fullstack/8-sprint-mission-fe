import { Link } from 'react-router-dom';
import './Navigator.css';

export default function Navbar() {
    return (
        <header>
            <div className="header-inner">
                <div className="navLeft">
                    <Link to="/" aria-label="판다마켓 홈으로 이동">
                        <img
                            src="/images/img_panda_logo.svg"
                            alt="판다마켓 로고"
                            width={153}
                        />
                    </Link>
                    <nav className="navigator" aria-label="주요 메뉴">
                        <Link to="/" aria-label="판다마켓 자유게시판으로 이동">
                            자유게시판
                        </Link>
                        <Link
                            to="/items"
                            aria-label="판다마켓 중고마켓으로 이동"
                        >
                            중고마켓
                        </Link>
                    </nav>
                </div>
                <Link to="/login" id="loginLinkButton" className="button">
                    로그인
                </Link>
            </div>
        </header>
    );
}
