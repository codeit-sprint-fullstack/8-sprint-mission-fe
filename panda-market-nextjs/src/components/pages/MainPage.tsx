import { FeatureItem } from "@/components/molecules/FeatureItem";
import { TextBanner } from "@/components/molecules/TextBanner";

export function MainPage() {
  return (
    <main className="mt-[60px] lg:mt-0">
      <div className="bg-background pb-[138px] lg:pb-0">
        <TextBanner
          imgSrc="/main-page/hero-img.svg"
          title={["일상의 모든 물건을", "거래해 보세요"]}
          btnText="구경하러 가기"
          linkTo="/items"
        />

        <section className="bg-white pb-[138px] lg:mt-[52px]">
          <FeatureItem
            imgSrc="/main-page/feature-img-01.svg"
            alt="인기 상품 아이콘"
            textTag="Hot Item"
            title={["인기 상품을", "확인해 보세요"]}
            text={["가장 HOT한 중고거래 물품을", "판다 마켓에서 확인해 보세요"]}
          />

          <FeatureItem
            imgSrc="/main-page/feature-img-02.svg"
            alt="검색 아이콘"
            textTag="Search"
            title={["구매를 원하는", "상품을 검색하세요"]}
            text={["구매하고 싶은 물품은 검색해서", "쉽게 찾아보세요"]}
          />

          <FeatureItem
            imgSrc="/main-page/feature-img-03.svg"
            alt="등록 아이콘"
            textTag="Register"
            title={["판매를 원하는", "상품을 등록하세요"]}
            text={["어떤 물건이든 판매하고 싶은 상품을", "쉽게 등록하세요"]}
          />
        </section>
      </div>

      <TextBanner
        imgSrc="/main-page/hero-img-02.svg"
        title={["믿을 수 있는", "판다마켓 중고 거래"]}
        isSection2
      />
    </main>
  );
}
