import Button from '@/components/Button';
import BestArticleCard from '@/components/BestArticleCard';
import styles from '@/styles/pages/ArticlePage.module.scss';
import SearchInput from '@/components/SearchInput';
import DropDownSort from '@/components/DropDownSort';
import ArticleList from '@/components/ArticleList';

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
          <Button type="write" />
        </div>
        <div className={styles.searchWrapper}>
          <SearchInput className={styles.input} size="lg" />
          <DropDownSort />
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
