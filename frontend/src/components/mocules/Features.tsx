import Image, { StaticImageData } from 'next/image';
import feature_1 from '@/images/feature/feature1-image.png';
import feature_2 from '@/images/feature/feature2-image.png';
import feature_3 from '@/images/feature/feature3-image.png';

import { ReactNode } from 'react';

type contents = {
  img: StaticImageData;
  name: string;
  title: ReactNode;
  description: ReactNode;
};

export default function Features() {
  const featureContents: contents[] = [
    {
      img: feature_1,
      name: 'Hot items',
      title: (
        <>
          인기 상품을 <br />
          확인해 보세요
        </>
      ),
      description: (
        <>
          가장 HOT한 중고거래 물품을
          <br />
          판다마켓에서 확인해 보세요
        </>
      ),
    },
    {
      img: feature_2,
      name: 'Search',
      title: (
        <>
          구매를 원하는 <br />
          상품을 검색하세요
        </>
      ),
      description: (
        <>
          구매하고 싶은 물품은 검색해서
          <br />
          쉽게 찾아보세요
        </>
      ),
    },
    {
      img: feature_3,
      name: 'Register',
      title: (
        <>
          판매를 원하는 <br />
          상품을 등록하세요
        </>
      ),
      description: (
        <>
          어떤 물건이든 판매하고 싶은 상품을
          <br />
          쉽게 등록하세요
        </>
      ),
    },
  ];

  return (
    <section className="flex h-fit w-full flex-col items-center bg-white">
      {featureContents.map((contents) => (
        <Feature key={featureContents.indexOf(contents)} contents={contents} />
      ))}
    </section>
  );
}

interface FeatrueProps {
  contents: contents;
}

function Feature({ contents }: FeatrueProps) {
  return (
    <div className="flex flex-col items-center justify-center md:h-[720px]">
      <div className="mb-[64px] flex h-fit w-full max-w-[988px] flex-col p-[16px] md:mb-0 md:flex-row-reverse md:justify-center md:gap-[64px] md:p-[24px]">
        <Image
          src={contents.img}
          className="mb-[20px] h-fit w-fit min-w-0 md:mb-0 md:max-h-[444px]"
          alt={contents.name}
        />
        <div className="flex flex-shrink-0 flex-col justify-center text-[var(--Secondary-700)]">
          <h2 className="text-[16px] font-[700] text-[var(--brand-blue)]">{contents.name}</h2>
          <h1 className="text-[24px] font-[700]">{contents.title}</h1>
          <p className="mt-[20px] text-[16px] font-[500]">{contents.description}</p>
        </div>
      </div>
    </div>
  );
}
