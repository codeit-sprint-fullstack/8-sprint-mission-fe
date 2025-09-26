'use client';

import Link from 'next/link';
import Button from '@/components/Button.jsx';
import BestArticleCard from '@/components/BestArticleCard.jsx';
import SearchInput from '@/components/SearchInput.jsx';
import DropDown from '@/components/DropDown.jsx';
import ArticleList from '@/components/ArticleList.jsx';

import styles from '@/styles/pages/ArticlePage.module.scss';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/LoadingSpinner';
import { convertTz } from '@/lib/dayjs';
import { useState, useEffect } from 'react';
import EmptyBoard from '@/components/EmptyBoard';

const ArticlePage = () => {
  const [sort, setSort] = useState('recent');
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  // 디바운싱: 500ms 후에 검색 실행
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const getArticles = async ({ sort, searchValue }) => {
    const q = searchValue.trim();
    const res = await api(`/articles?sort=${sort}&q=${q}`);
    return res.json();
  };

  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['articles', sort, debouncedSearchValue],
    queryFn: () => getArticles({ sort, searchValue: debouncedSearchValue }),
    keepPreviousData: true,
  });

  if (error) return <p>{error.message}</p>;

  return (
    <div className={styles.articlePage}>
      <div className={styles.bestContents}>
        <div className={styles.title}>베스트 게시글</div>
        <div className={styles.cardWrapper}>
          <BestArticleCard />
          <BestArticleCard />
          <BestArticleCard />
        </div>
      </div>
      <div className={styles.normalContents}>
        <div className={styles.header}>
          <div className={styles.title}>게시글</div>
          <Link href="/article/post" className={styles.linkTag}>
            <Button type="write" />
          </Link>
        </div>
        <div className={styles.searchWrapper}>
          <SearchInput size="lg" value={searchValue} onChange={setSearchValue} />
          <DropDown selected={sort} onChange={setSort} />
        </div>
        <div className={styles.contentsWrapper}>
          {isLoading && <LoadingSpinner fullscreen={false} blur={false} />}
          {articles?.data && articles.data.length > 0
            ? articles.data.map((article) => (
                <ArticleList
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  like={article.like}
                  date={convertTz(article.createdAt)}
                />
              ))
            : !isLoading && <EmptyBoard />}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
