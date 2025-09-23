import Image from 'next/image';
import DropDown from '@/components/DropDown.jsx';
import ic_profile from '/public/icons/ic_profile.svg';

import styles from '@/styles/components/CommentReplyCard.module.scss';

const CommentReplyCard = () => {
  return (
    <div className={styles.replyCard}>
      <div className={styles.comment}>
        <div className={styles.detail}>혹시 사용기간이 어떻게 되실까요?</div>
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
          <div className={styles.timeAgo}>1시간 전</div>
        </div>
      </div>
    </div>
  );
};

export default CommentReplyCard;
