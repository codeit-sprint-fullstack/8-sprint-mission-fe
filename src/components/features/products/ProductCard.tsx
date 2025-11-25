import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({
  type = 'normal',
  id,
  name = '',
  price = 0,
  likeCount = 0,
}: {
  type?: 'normal' | 'best';
  id: string;
  name: string;
  price: number;
  likeCount: number;
}) => {
  return (
    <Link href={`/products/${id}`} className="flex flex-col gap-4">
      {type === 'normal' ? (
        <Image src="/img_default_product.svg" alt="product" width={220} height={220} />
      ) : (
        <Image src="/img_default_product.svg" alt="product" width={282} height={282} />
      )}
      <div className="flex flex-col gap-[6px]">
        <div className="text-secondary-800 text-sm leading-[24px] font-medium">{name}</div>
        <div className="text-secondary-800 text-base leading-[26px] font-bold">
          {price.toLocaleString('ko-KR')}원
        </div>
        <div className="flex items-center gap-1">
          <Image src="/icons/ic_heart.svg" alt="ic_heart" width={16} height={16} />
          <div className="text-secondary-600 text-xs leading-[18px] font-normal">{likeCount}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
