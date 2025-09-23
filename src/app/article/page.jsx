import Link from 'next/link';
import Button from '@/components/Button.jsx';
import BestArticleCard from '@/components/BestArticleCard.jsx';
import SearchInput from '@/components/SearchInput.jsx';
import DropDown from '@/components/DropDown.jsx';
import ArticleList from '@/components/ArticleList.jsx';

import styles from '@/styles/pages/ArticlePage.module.scss';

const ArticlePage = () => {
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
          <ArticleList />
          <ArticleList />
          <ArticleList />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
