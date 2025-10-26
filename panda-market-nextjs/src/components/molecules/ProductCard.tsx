"use client";

import Link from "next/link";
import Image from "next/image";
import { LikeButton } from "@/components/atoms/LikeButton";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchProductDetail } from "@/lib/api/product/preFetch";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  likeCount: number;
}

const DEFAULT_IMAGE = "/product-list/prod-test.png";

export function ProductCard({
  id,
  name,
  price,
  image = DEFAULT_IMAGE,
  likeCount,
}: ProductCardProps) {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    prefetchProductDetail(queryClient, id);
  };

  return (
    <div className="text-secondary-800">
      <Link
        href={`/product/${id}`}
        className="block"
        onMouseEnter={handleMouseEnter}
      >
        <img
          src={image}
          alt={name}
          width={282}
          height={282}
          className="w-full max-w-[282px] rounded-[1.6rem]"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />
        <div className="flex flex-col items-start gap-[0.6rem] mt-4">
          <h2 className="text-sm">{name}</h2>
          <p className="text-base font-bold">{price.toLocaleString()}원</p>
        </div>
      </Link>
      <LikeButton likeCount={likeCount} />
    </div>
  );
}
