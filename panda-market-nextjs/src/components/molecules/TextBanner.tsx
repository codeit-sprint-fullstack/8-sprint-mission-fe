import Link from "next/link";
import { Button } from "../ui/button";

interface TextBannerProps {
  imgSrc: string;
  title: string[];
  btnText?: string;
  linkTo?: string;
  isSection2?: boolean;
}

export function TextBanner({
  imgSrc,
  title,
  btnText,
  linkTo,
  isSection2,
}: TextBannerProps) {
  return (
    <section className="bg-[#cfe5ff]">
      <div
        className={`
          w-full max-w-[1200px] mx-auto bg-no-repeat bg-right-bottom
          ${
            isSection2
              ? "pt-[20rem] pb-[61.4rem] lg:pt-[20rem] lg:pb-[30rem] md:pt-[12rem] md:pb-[30rem]"
              : "pt-[24rem] pb-[10rem] lg:pt-[8.4rem] lg:pb-[30rem] md:pt-[4.8rem] md:pb-[33.6rem]"
          }
          lg:text-center lg:bg-bottom
          md:bg-[length:calc(100%-6.4rem)]
        `}
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <h1 className="text-[3rem] font-bold mb-[3.2rem] text-[#1f2937] lg:text-[3rem] lg:mb-[2.4rem] md:text-[2.8rem] md:mb-[2rem] md:text-center">
          {title[0]}
          <br className="lg:hidden md:block" />
          {title[1]}
        </h1>
        {btnText && linkTo && (
          <Button size="lg" variant="default" asChild>
            <Link href={linkTo}>{btnText}</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
