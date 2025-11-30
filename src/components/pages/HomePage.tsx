import Banner from "../features/home/Banner";
import MainFrame from "../organisms/MainFrame";
import Features from "../features/home/Features";

import topBannerImg from "@/images/banner/hero-image.png";
import bottomBannerImg from "@/images/banner/bottom-banner-image.png";

export default function HomePage() {
  return (
    <MainFrame HasNav={true}>
      <Banner bgImg={topBannerImg} btnUrl="/itmes" btnText="구경해보기">
        <h1 className="text-center text-[40px] font-[700] text-[var(--Secondary-700)] md:text-start">
          일상의 모든 물건을 <br className="block md:hidden xl:block" />
          거래해 보세요
        </h1>
      </Banner>
      <Features />
      <Banner bgImg={bottomBannerImg}>
        <h1 className="text-center text-[40px] font-[700] text-[var(--Secondary-700)] xl:text-start">
          믿을 수 있는
          <br />
          판다마켓 중고거래
        </h1>
      </Banner>
    </MainFrame>
  );
}
