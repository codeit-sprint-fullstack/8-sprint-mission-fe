import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductItem = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <Link
      href={`/items/${product.id}`}
      className="block group"
    >
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
        <Image
          src={product.images?.[0] || '/images/sample/img_sample1.png'}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm text-gray-700 line-clamp-1">{product.name}</h3>

        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">{formatPrice(product.price)}원</span>
          <div className="flex items-center gap-1 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <span className="text-xs">{product.favoriteCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
