'use client';

import { useState } from 'react';
import Button from '@/components/Button';

import styles from '@/styles/pages/ArticlePostPage.module.scss';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';

const ArticlePostPage = () => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  return (
    <div className={styles.articlePostPage}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>게시글 쓰기</div>
        <div className={styles.headerButton}>
          <Button type="post" />
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.contentTitle}>
          <div className={styles.title}>*제목</div>
          <Input type="title" value={title} onChange={setTitle} />
        </div>
        <div className={styles.contentDetail}>
          <div className={styles.title}>*내용</div>
          <Textarea type="detail" size="lg" value={detail} onChange={setDetail} />
        </div>
      </div>
    </div>
  );
};

export default ArticlePostPage;
