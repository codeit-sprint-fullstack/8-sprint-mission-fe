import Image from "next/image";
import React from "react";

import ic_heart from "/public/ic_heart.svg";

const Heart = () => {
  return (
    <div className="flex gap-1">
      <Image src={ic_heart} alt="heart_icon" width={16} height={16} />
      <span className="text-gray-500">9999</span>
    </div>
  );
};

export default Heart;
