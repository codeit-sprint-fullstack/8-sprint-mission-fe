'use client';

import { useGetArticleInfinityScroll } from '@/hooks/queries/useArticleQueries';
import useDebounce from '@/hooks/useDebounce';
import { useState } from 'react';
import { Article } from '@/types/article';
import BestArticleCard from '@/components/features/articles/BestArticleCard';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import SearchInput from '@/components/common/SearchInput';
import DropDown from '@/components/common/DropDown';
import ArticleList from '@/components/features/articles/ArticleList';
import { convertTz } from '@/libs/day';
import EmptyBoard from '@/components/common/EmptyBoard';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';

const ArticlesPage = () => {
  const router = useRouter();
  const [sort, setSort] = useState<'recent' | 'likes'>('recent');
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const {
    data: infiniteArticles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetArticleInfinityScroll({ sort, searchQuery: debouncedSearchValue, limit: 15 });

  const { targetRef } = useInfiniteScrollObserver({
    hasNextPage,
    isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  const allArticles = infiniteArticles?.pages.flatMap((page) => page.data?.articles) ?? [];

  const bestArticles = allArticles
    .sort((a: Article, b: Article) => b.likeCount - a.likeCount)
    .slice(0, 3);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="mx-auto mt-[24px] mb-[293px] flex max-w-[1200px] flex-col justify-center gap-10">
        <div className="flex w-full flex-col gap-6">
          <div className="text-coolGray-900 text-xl font-bold">베스트 게시글</div>
          <div className="flex w-full items-center gap-6">
            {bestArticles?.map((article: Article, index: number) => (
              <BestArticleCard
                key={article.id}
                id={article.id}
                rank={index + 1}
                title={article.title}
                like={article.likeCount}
                date={article.createdAt}
              />
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col justify-center gap-6">
          <div className="flex items-center justify-between">
            <div className="text-secondary-800 text-xl leading-[32px] font-bold">게시글</div>
            <Button type="write" onClick={() => router.push('/articles/post')} />
          </div>
          <div className="flex items-center justify-between">
            <SearchInput size="lg" value={searchValue} setValue={setSearchValue} />
            <DropDown
              type="sort"
              selected={sort}
              handlers={null}
              onChange={(option) => {
                if (option === 'recent' || option === 'likes') {
                  setSort(option);
                }
              }}
            />
          </div>
          <div className="flex flex-col justify-center gap-6">
            {allArticles.length > 0
              ? allArticles.map((article: Article) => (
                  <ArticleList
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    nickname={article.owner?.nickname}
                    like={article.likeCount}
                    date={convertTz(article.createdAt)}
                  />
                ))
              : !isLoading && <EmptyBoard type="article" />}
          </div>
        </div>
        <div ref={targetRef} className="flex h-10 justify-center" />
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </>
  );
};

export default ArticlesPage;
