import Link from 'next/link';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="w-full">
      <section className="flex w-full justify-center bg-[#cfe5ff] px-[calc((100%-1200px)/2)] pt-50">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col justify-center gap-8">
            <div className="text-secondary-700 text-[40px] leading-[56px] font-bold">
              일상의 모든 물건을 거래해 보세요
            </div>
            <Link
              href="/products"
              className="bg-primary-100 mb-[60px] w-[357px] rounded-[40px] px-[124px] py-4 text-center text-xl leading-[32px] font-semibold whitespace-nowrap text-white"
            >
              구경하러 가기
            </Link>
          </div>
          <Image src="/img_home_top.svg" alt="topImage" width={746} height={340} />
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1200px] py-[138px]">
        <div className="flex justify-around gap-16">
          <Image src="/section1_img.svg" alt="section1Img" width={588} height={444} />
          <div className="flex flex-col gap-3">
            <div className="text-primary-100 text-lg leading-[26px] font-bold">Hot Item</div>
            <div className="flex flex-col justify-center gap-6">
              <div className="text-secondary-700 text-[40px] leading-[56px] font-bold">
                인기상품을 확인해 보세요
              </div>
              <div className="text-secondary-700 text-2xl leading-[32px]">
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1200px] py-[138px]">
        <div className="flex justify-around gap-16">
          <div className="flex flex-col gap-3">
            <div className="text-primary-100 text-lg leading-[26px] font-bold">Search</div>
            <div className="flex flex-col justify-center gap-6">
              <div className="text-secondary-700 text-[40px] leading-[56px] font-bold">
                구매를 원하는 상품을 검색하세요
              </div>
              <div className="text-secondary-700 text-2xl leading-[32px]">
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </div>
            </div>
          </div>
          <Image src="/section2_img.svg" alt="section2Img" width={588} height={444} />
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1200px] py-[138px]">
        <div className="flex justify-around gap-16">
          <Image src="/section3_img.svg" alt="section3Img" width={588} height={444} />
          <div className="flex flex-col gap-3">
            <div className="text-primary-100 text-lg leading-[26px] font-bold">Register</div>
            <div className="flex flex-col justify-center gap-6">
              <div className="text-secondary-700 text-[40px] leading-[56px] font-bold">
                판매를 원하는 상품을 등록하세요
              </div>
              <div className="text-secondary-700 text-2xl leading-[32px]">
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex w-full justify-center bg-[#cfe5ff] px-[calc((100%-1200px)/2)] pt-[143px]">
        <div className="flex w-full justify-between">
          <div className="mb-[60px] w-full text-[40px] leading-[56px] font-bold">
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </div>
          <Image src="/img_home_bottom.svg" alt="bottomImg" width={746} height={397} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
