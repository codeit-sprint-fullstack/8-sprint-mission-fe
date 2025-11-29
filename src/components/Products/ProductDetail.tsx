"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import KebabMenu from "@/components/Kebab/KebabMenu";
import ItemTag from "@/components/Products/ItemTag";
import LikeButton from "@/components/Button/LikeButton";
import { fetchProduct } from "@/api/product";
import { ProductDetail } from "@/types/entities";

const ItemsDetail = () => {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<ProductDetail | null>(null);

  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      try {
        const data = await fetchProduct(id);

        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, [id]);

  if (!product) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto my-8 px-4">
      <div className="flex items-center self-stretch gap-6 mb-10 w-full">
        <Image
          src="/img_default.svg"
          alt="상품 기본 이미지"
          width={486}
          height={486}
          className="w-[486px] h-[486px] rounded-2xl"
        />
        <div className="flex flex-col items-start w-full max-w-[696px]">
          <div className="flesx flex-col items-start self-stretch">
            <div className="flex items-start justify-between self-stretch mb-4">
              <div className="flex flex-col items-start gap-4 self-stretch mb-4">
                <p className="self-stretch text-2xl font-semibold text-gray-800 leading-[32px]">
                  {product.title}
                </p>
                <h1 className="self-stretch text-5xl font-semibold text-gray-800">
                  {product.price?.toLocaleString()}원
                </h1>
              </div>

              <KebabMenu type="item" id={product.id} />
            </div>

            <hr className="w-full border-t border-gray-200 mb-6" />
          </div>

          <div className="flex flex-col items-start mb-[62px]">
            <div className="self-stretch text-base font-semibold text-gray-600 leading-[26px] mb-6">
              <p className="mb-4">상품 소개</p>
              <p className="font-normal">{product.description}</p>
            </div>
            <div>
              <p className="self-stretch text-base font-semibold text-gray-600 leading-[26px] mb-4">
                상품 태그
              </p>
              <div>
                <ItemTag tags={product.tags} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between self-stretch">
            <div className="flex items-center gap-4">
              <Image
                src="/ic_profile.svg"
                alt="Profile"
                width={40}
                height={40}
              />
              <div className="flex flex-col items-start gap-[2px] text-sm">
                <p className="font-medium text-gray-600">{product.nickname}</p>
                <p className="font-normal text-gray-400">{product.createdAt}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="h-[34px] border-l border-gray-200" />

              <LikeButton
                type="product"
                targetId={product.id}
                initialCount={product.favoriteCount}
                // initialLiked={product.isFavorite}
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full border-t border-gray-200 mb-4" />
    </div>
  );
};

export default ItemsDetail;
