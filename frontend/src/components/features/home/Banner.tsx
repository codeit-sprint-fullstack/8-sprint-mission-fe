import Button from '../../atoms/Button';
import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

interface BannerProps {
  bgImg: StaticImageData;
  btnUrl?: string;
  btnText?: string;
  children?: ReactNode;
}

export default function Banner({ bgImg, btnUrl = '', btnText = '', children }: BannerProps) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-end bg-[var(--bg-blue)]">
      <div className="flex h-full w-full max-w-[1200px] flex-col items-center justify-between px-[16px] xl:h-fit xl:flex-row xl:px-0 xl:px-[24px]">
        <div className="mt-[80px] flex h-fit flex-shrink-0 flex-col justify-center">
          {children}
          {btnUrl && (
            <Button
              to={btnUrl}
              className="mt-[32px] mb-[40px] flex-shrink-0 rounded-[999px] px-[124px] py-[16px] text-[16px] font-[600]"
            >
              {btnText}
            </Button>
          )}
        </div>
        <div className="flex h-fit flex-col justify-end">
          {/* 이미지가 flex 안에서 안 줄어들 때는 min-w-0을 적용시키면 된다. (실험적으로 알게된 사실) */}
          <Image src={bgImg} className="h-fit w-full min-w-0" alt="배경 이미지" />
        </div>
      </div>
    </section>
  );
}
