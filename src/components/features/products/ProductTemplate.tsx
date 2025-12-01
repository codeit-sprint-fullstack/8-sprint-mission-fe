import Button from '@/components/common/Button';
import DropDown from '@/components/common/DropDown';
import SearchInput from '@/components/common/SearchInput';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';

interface ProductTemplateProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  orderBy: 'recent' | 'like';
  setOrderBy: (orderBy: 'recent' | 'like') => void;
  products?: Product[];
}

const ProductTemplate = ({
  searchValue,
  setSearchValue,
  orderBy,
  setOrderBy,
  products,
}: ProductTemplateProps) => {
  const router = useRouter();

  const handleOrderByChange = (option: string) => {
    if (option === 'recent' || option === 'like') {
      setOrderBy(option);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="text-secondary-900 text-xl leading-[32px] font-bold">판매 중인 상품</div>
        <div className="flex items-center gap-3">
          <SearchInput value={searchValue} setValue={setSearchValue} size="sm" />
          <Button type="productPost" onClick={() => router.push('/products/post')} />
          <DropDown type="sort" selected={orderBy} handlers={null} onChange={handleOrderByChange} />
        </div>
      </div>
      <div className="grid w-full grid-cols-5 gap-x-6 gap-y-10">
        {products &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              type="normal"
              name={product.name}
              price={product.price}
              likeCount={product.likeCount}
            />
          ))}
      </div>
    </div>
  );
};
export default ProductTemplate;
