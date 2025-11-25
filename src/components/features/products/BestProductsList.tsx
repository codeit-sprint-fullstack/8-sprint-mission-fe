import { Product } from '@/types/product';
import ProductCard from './ProductCard';

const BestProductsList = ({ bestProducts }: { bestProducts: Product[] }) => {
  return (
    <div>
      <div className="text-secondary-900 text-xl leading-[32px] font-bold">베스트 상품</div>
      <div className="flex w-full items-center gap-6">
        {bestProducts?.map((item) => (
          <ProductCard
            type="best"
            key={item?.id}
            id={item?.id}
            name={item?.name}
            price={item?.price}
            likeCount={item?.likeCount}
          />
        ))}
      </div>
    </div>
  );
};

export default BestProductsList;
