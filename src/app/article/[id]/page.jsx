import Button from '@/components/Button';
import CommentReplyCard from '@/components/CommentReplyCard';

import styles from '@/styles/pages/DetailArticlePage.module.scss';

const DetailArticlePage = () => {
  return (
    <div className={styles.detailArticlePage}>
      <div className={styles.pageWrapper}>
        <div className={styles.detailText}>detail</div>
        <div className={styles.commentWrapper}>
          <div className={styles.addComment}>Add Comment</div>
          <CommentReplyCard />
        </div>
        <div className={styles.buttonWrapper}>
          <Button type="goBack" size="md" />
        </div>
      </div>
    </div>
  );
};

export default DetailArticlePage;
