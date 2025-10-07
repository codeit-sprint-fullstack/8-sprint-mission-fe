import Heart from "@/app/(components)/atoms/Heart";
import Image from "next/image";
import React from "react";

import img_defalt from "/public/img_default.svg";

export default function ProductItem({ item }) {
  const { images, name, price, favoriteCount } = item;

  return (
    <div>
      <img
        src={images ? images : img_defalt}
        alt="product_image"
        width={220}
        height={220}
        className="size-55"
      />
      <div className="mt-4 text-gray-800">
        <p className="text-sm mb-1.5">{name}</p>
        <p className="font-bold mb-2">{price}</p>
        <Heart size={16} fontSize="text-xs" count={favoriteCount} />
      </div>
    </div>
  );
}
