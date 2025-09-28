import Image from 'next/image';
import { convertTz } from '@/lib/dayjs';
import styles from '@/styles/components/BestArticleCard.module.scss';

import articleImg from '../../public/articleImg.svg';
import ic_medal from '../../public/icons/ic_medal.svg';
import ic_heart from '../../public/icons/ic_heart.svg';
import Link from 'next/link';

const BestArticleCard = ({ id = '', rank = 0, title = '', like = 0, date = '' }) => {
  return (
    <Link className={styles.bestCard} href={`/article/${id}`}>
      <div className={styles.header}>
        <Image src={ic_medal} alt="ic_medal" />
        <div className={styles.best}>{`Best ${rank}`}</div>
      </div>
      <div className={styles.contents}>
        <div className={styles.title}>{title}</div>
        <Image className={styles.contentsImg} src={articleImg} alt="articleImg" />
      </div>
      <div className={styles.footer}>
        <div className={styles.nickAndLikes}>
          <div className={styles.nickName}>총명한판다</div>
          <div className={styles.likesWrapper}>
            <Image src={ic_heart} alt="ic_heart" />
            <div className={styles.likes}>{like}</div>
          </div>
        </div>
        <div className={styles.date}>{convertTz(date)}</div>
      </div>
    </Link>
  );
};

export default BestArticleCard;
