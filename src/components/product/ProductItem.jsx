import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductItem = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <Link
      href={`/items/${product.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <div className="relative w-full h-48">
        <Image
          src={product.imageUrl || '/images/sample/img_sample1.png'}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-2 left-2">
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
              {product.tags[0]}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">{product.name}</h3>

        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold">{formatPrice(product.price)}원</span>
          <div className="flex items-center gap-1">
            <Image src="/images/icon/ic_heart.svg" alt="좋아요" width={16} height={16} />
            <span className="text-sm">{product.favoriteCount}</span>
          </div>
        </div>

        <p className="text-sm mb-2 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between text-xs">
          <span>{product.ownerNickname}</span>
          <span>{formatDate(product.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
