import React from "react";
import Image from "next/image";

const Deskbottom = () => {
  return (
    <section className="relative flex justify-center w-full h-[540px] bg-[#CFE5FF]">
      <div className="absolute bottom-0 flex items-center justify-center gap-7 max-w-[1200px] mx-auto">
        <div className="flex flex-col justify-center items-start gap-8 pb-[60px]">
          <h1 className="text-[40px] font-bold text-gray-700 leading-[140%] text-nowrap">
            믿을 수 있는
            <br />
            판다 마켓 중고 거래
          </h1>
        </div>
        <Image
          src="/home_bottom_img.svg"
          alt="HomeDown"
          className="flex-shrink-0"
          width={746}
          height={397}
        />
      </div>
    </section>
  );
};

export default Deskbottom;
