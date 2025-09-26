import Image from "next/image";
import React from "react";
import pandaLogo from "/public/panda.svg";

const Logo = () => {
  return (
    <div className="flex items-center gap-[8.592px]">
      <Image src={pandaLogo} alt="panda_logo" width={40} />
      <span className=" font-logo font-bold text-[25.633px] text-Primary-100">판다마켓</span>
    </div>
  );
};

export default Logo;
