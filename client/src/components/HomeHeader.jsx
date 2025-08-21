import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';

import logoImg from '/images/logo/logo.svg';
import logoMobileImg from '/images/logo/logo_mobile.svg';


function HomeHeader(){
    const deviceType = useContext(LocaleContext);
    const location = useLocation();

    const logo = deviceType == 'mobile' ? logoMobileImg : logoImg;
    const logoWidth = deviceType == 'mobile' ? '81px' : '153px';


    return (
        <header>
            <div>
                <Link to="/"><img src={logo} alt="판다마켓 로고" width={logoWidth}/></Link>
                {/* 랜딩 페이지에서는 네비게이션 목록이 안나오도록 설정 */}
                {location.pathname !== '/' && <Link><p>자유게시판</p></Link>}
                {location.pathname !== '/' && <Link to="/items"><p>중고마켓</p></Link>}
            </div>
            <Link to="/"><button id="loginLink" className="button">로그인</button></Link>
        </header>
    )
}

export default HomeHeader;
