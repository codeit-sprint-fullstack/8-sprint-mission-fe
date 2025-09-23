import CommentReplyCard from '@/components/CommentReplyCard';
import styles from '@/styles/pages/DetailArticlePage.module.scss';

const DetailArticlePage = () => {
  return (
    <div className={styles.detailArticlePage}>
      <div className={styles.pageWrapper}>
        <div>
          <div className={styles.detailText}>detail</div>
          <div className={styles.submitComment}>Add Comment</div>
          <div className={styles.commentReply}>Reply</div>
        </div>
        <CommentReplyCard />
        <button>button</button>
      </div>
    </div>
  );
};

export default DetailArticlePage;
