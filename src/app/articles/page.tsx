'use client';

import { useGetArticles } from '@/hooks/queries/useArticleQueries';
import useDebounce from '@/hooks/useDebounce';
import { useState } from 'react';
import { Article } from '@/types/article';
import BestArticleCard from '@/components/features/articles/BestArticleCard';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ArticlesPage = () => {
  const router = useRouter();
  const [sort, setSort] = useState<'recent' | 'like'>('recent');
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { data: articles, isLoading } = useGetArticles(sort, debouncedSearchValue);

  const bestArticles = articles?.data
    .slice()
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
            <Button type="write" onClick={() => router.push('/article/post')} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlesPage;
