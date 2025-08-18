import logoImg from '/images/logo/logo.svg';
import logoMobileImg from '/images/logo/logo_mobile.svg';


function HomeHeader({deviceType}){
    const logo = deviceType == 'mobile' ? logoMobileImg : logoImg;
    const logoWidth = deviceType == 'mobile' ? '81px' : '153px';

    return (
        <header>
            <div>
                <a href="/" aria-label="홈으로 이동"
                ><img src={logo} alt="판다마켓 로고" width={logoWidth}
                /></a>
                <a href="/">자유게시판</a>
                <a href="/">중고마켓</a>
            </div>
            
            <a href="/" id="loginLink" className="button">로그인</a>
        </header>
    )
}

export default HomeHeader;
