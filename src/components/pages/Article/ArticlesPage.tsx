'use client';

//라이브러리
import { useState, useEffect } from 'react';

//훅
import useAsync from '@/hooks/useAsync';
import { getArticles } from '@/api/ArticleService';
import { useDeviceProvider } from '../../provider/DevicePorvider';

//컴포넌트
import MainFrame from '../../organisms/MainFrame';
import SectionBar from '../../mocules/SectionBar';
import ArticlesSectionBar from '../../features/artilces/ArticlesSectionBar';
import { ArticleList, BestArticleList } from '../../features/artilces/ArticleList';
import { ArticleResponse } from '@/constants/articleType';

export default function ArticlesPage() {
  const [bestArticles, setBestArticles] = useState<ArticleResponse[]>([]);
  const [commonArticles, setCommonArticles] = useState<ArticleResponse[]>([]);

  //삼화 미션 - 커스텀 훅 만들기 (GET 리퀘스트 오류, 지연 처리 훅)
  const [isLoading, loadingError, getItemsAsync] = useAsync(getArticles);
  const [pageIdx, setPageIdx] = useState<number>(1);
  const [order, setOrder] = useState<string>('recent');
  const [search, setSearch] = useState<string>('');

  const deviceType = useDeviceProvider();

  //화면 크기에 따라 다시 상품 목록을 받아옵니다.
  //목록 배열 스타일은 이번에는 CSS에서 관리하는 걸로 했습니다.
  useEffect(() => {
    handleBestArticleLoad();
  }, []);

  useEffect(() => {
    handleCommonArticleLoad();
  }, [deviceType, pageIdx, order, search]);

  const handleBestArticleLoad = async () => {
    const res = await getArticles(1, 3, 'favorite');
    setBestArticles(res);
  };

  const handleCommonArticleLoad = async () => {
    const setPageSize = {
      mobile: 4,
      tablet: 6,
      desktop: 10,
    };
    //페이지 로딩이 끝날 때까지 페이지 이동이 안되도록 막았습니다.
    const res = await getItemsAsync(pageIdx, setPageSize[deviceType], order, search);
    if (!res) return;
    setCommonArticles(res);
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
    <>
      <MainFrame HasNav={true}>
        <div className="pt-[17px] px-[16px] pb-[140px] w-full max-w-[1200px] flex flex-col gap-[40px]">
          <section className="w-full flex flex-col justify-center items-center mx-auto gap-[12px]">
            <SectionBar title="베스트 게시글" />
            <BestArticleList articles={bestArticles} />
            {/* <ProductList items={bestProducts}/> */}
          </section>
          <section className="w-full flex flex-col justify-center items-center mx-auto gap-[12px]">
            <ArticlesSectionBar
              title="게시글"
              order={order}
              search={search}
              onChangeOrder={handleDropdown}
              onChangeSearch={handleSearchInput}
              registerName="글쓰기"
              registerUrl="/articles/upload"
            />
            <ArticleList articles={commonArticles} />
            {loadingError && <div>{loadingError.message}</div>}
          </section>
        </div>
      </MainFrame>
    </>
  );
}
