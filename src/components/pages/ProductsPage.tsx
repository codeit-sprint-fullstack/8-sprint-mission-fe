'use client';

//라이브러리
import { useState, useEffect } from 'react';

//훅
import useAsync from '@/hooks/useAsync';
import { getProductList } from '@/api/ProductService';
import { useDeviceProvider } from '../provider/DevicePorvider';

//컴포넌트
import MainFrame from '../organisms/MainFrame';
import ProductsSectionBar from '../features/products/ProductsSectionBar';
import ProductList from '../features/products/ProductList';
import PageButton from '../features/products/PageButton';

interface ProductType {
  id: string;
  name: string;
  price: number;
  images: string[];
  favoriteCount: number;
}

export default function ProductsPage() {
  const [bestProducts, setBestProducts] = useState<ProductType[]>([]);
  const [commonProducts, setCommonProducts] = useState<ProductType[]>([]);

  //삼화 미션 - 커스텀 훅 만들기 (GET 리퀘스트 오류, 지연 처리 훅)
  const [isLoading, loadingError, getItemsAsync] = useAsync(getProductList);
  const [pageIdx, setPageIdx] = useState(1);
  const [order, setOrder] = useState('recent');
  const [search, setSearch] = useState('');

  const deviceType = useDeviceProvider();

  //화면 크기에 따라 다시 상품 목록을 받아옵니다.
  //목록 배열 스타일은 이번에는 CSS에서 관리하는 걸로 했습니다.
  useEffect(() => {
    handleCommonProductLoad(pageIdx, order, search);
  }, [deviceType, pageIdx, order, search]);

  const handleBestProductLoad = async () => {
    const res = await getProductList(1, 4, 'favorite');
    setBestProducts(res);
  };

  const handleCommonProductLoad = async (pageIdx: number, order: string, search: string) => {
    const setPageSize = {
      mobile: 4,
      tablet: 6,
      desktop: 10,
    };
    //페이지네이션 로딩 기능 (버튼 비활성화).
    const res = await getItemsAsync(pageIdx, setPageSize[deviceType], order, search);
    if (!res) return;
    setCommonProducts(res);
  };

  const handlePagechange = (idx: number) => {
    setPageIdx(idx);
  };

  const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <MainFrame HasNav={true}>
      <div className="w-full h-fit px-[16px] pt-[17px] pb-[140px] flex flex-col items-center gap-[16px]">
        {/* 베스트 상품 표시를 임시로 막았습니다. - 요구사항 */}
        {false && (
          <section>
            <div className="">
              <p>베스트 상품</p>
            </div>
            <ProductList items={bestProducts} isCommon={false} />
          </section>
        )}

        <section className="w-full flex flex-col items-center gap-[24px]">
          <ProductsSectionBar
            title="판매 중인 상품"
            registerName="상품 등록하기"
            registerUrl="/items/upload"
            order={order}
            onChangeOrder={handleDropdown}
            search={search}
            onChangeSearch={handleSearchInput}
          />
          {loadingError && <div>{loadingError.message}</div>}
          <ProductList items={commonProducts} isCommon={true} />
          <PageButton pageIdx={pageIdx} onPageChange={handlePagechange} disabled={isLoading} />
        </section>
      </div>
    </MainFrame>
  );
}
