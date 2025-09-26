'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/components/ArticleList.module.scss';

import articleImg from '../../public/articleImg.svg';
import ic_profile from '../../public/icons/ic_profile.svg';
import ic_heart from '../../public/icons/ic_heart.svg';

const ArticleList = ({ id = '', title = '', nickName = '', like = 0, date = '' }) => {
  return (
    <Link href={`/article/${id}`} className={styles.articleList}>
      <div className={styles.contents}>
        <div className={styles.title}>{title}</div>
        <Image src={articleImg} alt="articleImg" />
      </div>
      <div className={styles.footer}>
        <div className={styles.nickAndDate}>
          <Image className={styles.icon} src={ic_profile} alt="ic_profile" />
          <div className={styles.nickName}>총명한판다</div>
          <div className={styles.date}>{date}</div>
        </div>
        <div className={styles.likesWrapper}>
          <Image className={styles.icon} src={ic_heart} alt="ic_heart" />
          <div className={styles.likes}>{like}</div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleList;
