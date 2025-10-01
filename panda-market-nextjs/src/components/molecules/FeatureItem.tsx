import Image from "next/image";

interface FeatureItemProps {
  imgSrc: string;
  alt: string;
  textTag: string;
  title: string[];
  text: string[];
}

export function FeatureItem({
  imgSrc,
  alt,
  textTag,
  title,
  text,
}: FeatureItemProps) {
  return (
    <article className="flex items-center justify-center w-full max-w-[988px] mx-auto my-[138px] gap-[62px] text-gray-700 bg-background even:flex-row-reverse last:mb-0">
      <Image
        src={imgSrc}
        alt={alt}
        className="rounded-2xl"
        width={500}
        height={500}
      />
      <div className="w-full max-w-[588px] mx-auto">
        <p className="text-[18px] text-primary-100 font-bold mb-3">{textTag}</p>
        <h2 className="text-[40px] font-bold mb-6 text-secondary-700">
          {title[0]}
          <br className="hidden xl:block" />
          {title[1]}
        </h2>
        <p className="text-[24px] font-medium text-secondary-700">
          {text[0]}
          <br />
          {text[1]}
        </p>
      </div>
    </article>
  );
}
