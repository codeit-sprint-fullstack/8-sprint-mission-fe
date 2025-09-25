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

const ArticlePage = () => {
  const getArticles = async () => {
    const res = await api('/articles');
    return res.json();
  };

  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  });

  if (isLoading) return <LoadingSpinner />;
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
          <SearchInput className={styles.input} size="lg" />
          <DropDown />
        </div>
        <div className={styles.contentsWrapper}>
          {articles.data.map((article) => (
            <ArticleList
              key={article.id}
              id={article.id}
              title={article.title}
              date={convertTz(article.createdAt)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
