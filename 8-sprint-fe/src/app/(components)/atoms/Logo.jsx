import Image from "next/image";
import React from "react";
import pandaLogo from "/public/panda.svg";

export function Logo() {
  return (
    <div className="flex items-center gap-[8.592px]">
      <Image src={pandaLogo} alt="panda_logo" width={40} />
      <span className=" font-logo font-bold text-[25.633px] text-Primary-100">
        판다마켓
      </span>
    </div>
  );
}

export function AuthLogo() {
  return (
    <div className="flex items-center gap-[11.12px] mb-10">
      <Image src={pandaLogo} alt="panda_logo" width={103.529} />
      <span className=" font-logo font-bold text-[66.344px] text-Primary-100">
        판다마켓
      </span>
    </div>
  );
}
