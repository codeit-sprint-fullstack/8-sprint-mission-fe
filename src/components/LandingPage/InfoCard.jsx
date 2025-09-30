import React from "react";
import Image from "next/image";

const InfoCard = () => {
  const infoData = [
    {
      img: "/home_img_01.svg",
      label: "Hot item",
      title: "인기 상품을\n확인해보세요",
      desc: "가장 HOT한 중고거래 물품을\n판다 마켓에서 확인해 보세요",
      reverse: false,
    },
    {
      img: "/home_img_02.svg",
      label: "Search",
      title: "구매를 원하는\n상품을 검색하세요",
      desc: "구매하고 싶은 물품은 검색해서\n쉽게 찾아 보세요",
      reverse: true,
    },
    {
      img: "/home_img_03.svg",
      label: "Register",
      title: "판매를 원하는\n상품을 등록하세요",
      desc: "어떤 물건이든 판매하고 싶은 상품을\n쉽게 등록하세요",
      reverse: false,
    },
  ];

  return (
    <section className="flex flex-col items-center w-full">
      {infoData.map(({ img, label, title, desc, reverse }, i) => (
        <div
          key={i}
          className={`flex items-center gap-16 bg-[#FCFCFC] p-8 my-[138px] ${
            reverse ? "flex-row-reverse" : ""
          }`}
        >
          <Image
            src={img}
            alt="Home label"
            className="flex-shrink-0"
            width={588}
            height={444}
          />
          <div className="flex flex-col gap-6 items-start">
            <p className="text-blue-500 text-lg font-bold">{label}</p>
            <div className="flex flex-col gap-4">
              <h1 className="text-[40px] font-bold leading-[140%] text-gray-800 whitespace-pre-line">
                {title}
              </h1>
              <p className="text-[24px] font-medium leading-8 text-[#374151] whitespace-pre-line">
                {desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default InfoCard;
