import Image from "next/image";
import React from "react";

import defaultImg from "/public/article_default.png";

const ImageBox = ({ src }) => {
  const imgSrc = src ? src : defaultImg;
  return (
    <div className="size-18 border bg-white border-gray-200 rounded-md p-3">
      <Image src={imgSrc} alt="defalt_img" />
    </div>
  );
};

export default ImageBox;
