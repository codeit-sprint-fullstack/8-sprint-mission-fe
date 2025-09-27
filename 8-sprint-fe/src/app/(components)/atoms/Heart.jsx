import Image from "next/image";
import React from "react";

import ic_heart from "/public/ic_heart.svg";

const Heart = ({size, fontSize, count}) => {
  return (
    <div className="flex gap-1 items-center">
      <Image src={ic_heart} alt="heart_icon" width={size} height={size} />
      <span className={`text-gray-500 ${fontSize}`}>{count}</span>
    </div>
  );
};

export default Heart;
