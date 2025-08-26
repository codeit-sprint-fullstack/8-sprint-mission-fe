import HomBanner from "../components/Home/HomeBanner";
import MainVisual from "../components/Home/MainVisual";
import img_home01 from "../assets/img_home/img_home_01.svg";
import img_home02 from "../assets/img_home/img_home_02.svg";
import img_home03 from "../assets/img_home/img_home_03.svg";
import HomeBottom from "../components/Home/HomeBottom";

function HomPage() {
  return (
    <>
      <MainVisual />
      <HomBanner
        bannerImg={img_home01}
        badget="Hot item"
        firstTitle="인기 상품을"
        secondTitle="확인해 보세요"
        firstContent="가장 HOT한 중고거래 물품을"
        secondContent="판다 마켓에서 확인해 보세요"
      />
      <HomBanner
        bannerImg={img_home02}
        badget="Search"
        firstTitle="구매를 원하는"
        secondTitle="상품을 검색하세요"
        firstContent="구매하고 싶은 물품은 검색해서"
        secondContent="쉽게 찾아보세요"
        isReverse={true}
      />
      <HomBanner
        bannerImg={img_home03}
        badget="Register"
        firstTitle="판매를 원하는"
        secondTitle="상품을 등록하세요"
        firstContent="어떤 물건이든 판매하고 싶은 상품을"
        secondContent="쉽게 등록하세요"
      />
      <HomeBottom />
    </>
  );
}
export default HomPage;
