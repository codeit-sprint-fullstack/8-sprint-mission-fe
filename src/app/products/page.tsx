'use client';

import BestProductsList from '@/components/features/products/BestProductsList';
import { useGetProducts, useGetBestProducts } from '@/hooks/queries/useProductQueries';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import Pagination from '@/components/common/Pagination';
import ProductTemplate from '@/components/features/products/ProductTemplate';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ProductsPage = () => {
  const [orderBy, setOrderBy] = useState<'recent' | 'like'>('recent');
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { data: products, isLoading: isProductsLoading } = useGetProducts(
    orderBy,
    debouncedSearchValue,
    page,
  );
  const { data: bestProductsData, isLoading: isBestProductsLoading } = useGetBestProducts();
  const bestProducts = bestProductsData?.data?.products;

  return (
    <>
      {(isProductsLoading || isBestProductsLoading) && <LoadingSpinner />}
      <div className="mx-auto mt-[26px] mb-[140px] max-w-[1200px]">
        <div className="mb-[43px] flex w-full flex-col gap-10">
          <BestProductsList bestProducts={bestProducts} />
          <ProductTemplate
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            products={products?.data?.products}
          />
        </div>
        <Pagination
          page={page}
          total={products?.pagination?.totalPages}
          onPageChange={setPage}
          max={products?.pagination?.limit}
        />
      </div>
    </>
  );
};

export default ProductsPage;
