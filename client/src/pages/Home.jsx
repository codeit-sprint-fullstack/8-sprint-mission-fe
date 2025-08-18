import { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext.js';

import HomeHeader from "../components/HomeHeader.jsx";
import HomeFooter from "../components/HomeFooter.jsx";
import Banner from '../components/Home/Banner.jsx';

import topBannerImg from "../../images/home/hero-image.png";
import bottomBannerImg from "../../images/home/bottom-banner-image.png";



function NotFound() {

    const deviceType = useContext(LocaleContext);

    return (
        <>
            <HomeHeader deviceType={deviceType}/>
            <main className="with-header">
                <Banner 
                    bgImg={topBannerImg}
                    btnUrl="/items"
                    btnText="구경해보기"
                >
                    <h1>
                        일상의 모든 물건을 {deviceType==='mobile' && <br/>}
                        거래해 보세요
                    </h1>
                </Banner>   
                <section id="features" class="wrapper">
                <div class="feature">
                <img src="images/home/feature1-image.png" alt="인기 상품" />
                <div class="feature-content">
                    <h2>Hot item</h2>
                    <h1>
                    인기 상품을 <span class="break-on-desktop"><br/></span>확인해
                    보세요
                    </h1>
                    <p class="feature-description">
                    가장 HOT한 중고거래 물품을<br />판다마켓에서 확인해 보세요
                    </p>
                </div>
                </div>
                </section>
                <Banner 
                    bgImg={bottomBannerImg}
                >
                    <h1>
                        믿을 수 있는<br/>
                        판다마켓 중고거래
                    </h1>
                </Banner>   
            </main> 
            <HomeFooter />
        </>
    );
}

export default NotFound;