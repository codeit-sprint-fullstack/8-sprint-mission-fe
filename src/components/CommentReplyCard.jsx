import Image from 'next/image';
import DropDown from '@/components/DropDown.jsx';
import ic_profile from '/public/icons/ic_profile.svg';
import { formatTimeAgo } from '@/lib/dayjs.js';

import styles from '@/styles/components/CommentReplyCard.module.scss';

const CommentReplyCard = ({ content = '', updatedAt = '' }) => {
  return (
    <div className={styles.replyCard}>
      <div className={styles.comment}>
        <div className={styles.detail}>{content}</div>
        <DropDown type="modify" />
      </div>
      <div className={styles.userInfo}>
        <Image
          className={styles.userProfile}
          src={ic_profile}
          alt="ic_profile"
          width="32px"
          height="32px"
        />
        <div className={styles.nameAndTime}>
          <div className={styles.userName}>똑똑한판다</div>
          <div className={styles.timeAgo}>{formatTimeAgo(updatedAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentReplyCard;
