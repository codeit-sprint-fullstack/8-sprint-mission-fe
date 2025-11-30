'use client';

import Link from 'next/link';
import { API_URL } from '@/config/config';
import Image from 'next/image';
import heartIcon from '@/images/ic_heart.svg';
import productDefault from '@/images/products/product_default.png';
import { useDeviceProvider } from '@/components/provider/DevicePorvider';
import { ProductType } from '@/constants/productConstants';

interface ProductProps {
  item: ProductType;
}

interface ProductListProps {
  items: ProductType[];
  isCommon: boolean;
}

export default function ProductList({ items, isCommon }: ProductListProps) {
  const devideType = useDeviceProvider();

  const commonProductPageSize = {
    desktop: 10,
    tablet: 6,
    mobile: 4,
  };
  const bestProductPageSize = {
    desktop: 4,
    tablet: 2,
    mobile: 1,
  };

  const gridStyleCommon = {
    desktop: 'grid-cols-5',
    tablet: 'grid-cols-3',
    mobile: 'grid-cols-2',
  };

  const gridStyleBest = {
    desktop: 'grid-cols-5',
    tablet: 'grid-cols-3',
    mobile: 'grid-cols-2',
  };

  return (
    <>
      {isCommon ? (
        //일반 상품
        <ul
          className={`grid gap-y-[40px] gap-x-[24px] list-none p-0 w-full h-fit mx-auto ${gridStyleCommon[devideType]}`}
        >
          {items.map((item, idx) => {
            return (
              //tailwind로 반응형 요소 개수 조정이 안돼서 조건부 렌더링 사용
              <li key={idx} className={idx + 1 > commonProductPageSize[devideType] ? 'hidden' : ''}>
                <Link href={`/items/${item.id}`} className="h-fit w-full">
                  <Product item={item} />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        //베스트 상품
        <ul
          className={`grid gap-y-[40px] gap-x-[24px] list-none p-0 w-full h-fit mx-auto mb-[24px] ${gridStyleBest[devideType]}`}
        >
          {items.map((item, idx) => {
            return (
              <li key={idx} className={idx + 1 > bestProductPageSize[devideType] ? 'hidden' : ''}>
                <Link href={`/items/${item.id}`} className="h-fit w-full">
                  <Product item={item} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function Product({ item }: ProductProps) {
  return (
    <div className="w-full flex flex-col items-start gap-[16px]">
      {/* 리스폰스 이미지가 없는 url이어서 임의로 랜덤 이미지를 넣었습니다.*/}
      <div className="w-full aspect-square overflow-hidden rounded-[16px]">
        {item.images?.length > 0 ? (
          <img
            src={`${API_URL}/uploads/${item.images[0]}`}
            alt="productImage"
            className="w-full h-full object-cover"
          />
        ) : (
          <Image src={productDefault} alt="productImage" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="gap-[6px]">
        <p className="text-[var(--Secondary-800)] text-[14px] font-medium">{item.name}</p>
        <p className="text-[var(--Secondary-800)] text-[16px] font-[700]">
          {item.price.toLocaleString() + '원'}
        </p>
        <div className="flex text-[var(--Secondary-800)] text-[12x] font-[500]">
          <button>
            <Image src={heartIcon} alt="heartIcon" />
          </button>
          <p>{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}
