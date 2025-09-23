'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import CommentReplyCard from '@/components/CommentReplyCard';
import Textarea from '@/components/Textarea';
import HeartTag from '@/components/HeartTag';
import DropDown from '@/components/DropDown.jsx';
import ic_profile from '/public/icons/ic_profile.svg';

import styles from '@/styles/pages/DetailArticlePage.module.scss';

const DetailArticlePage = () => {
  const [textValue, setTextValue] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const handleTextareaChange = (value) => {
    setTextValue(value);
    setIsBtnDisabled(value.trim().length === 0);
  };

  return (
    <div className={styles.detailArticlePage}>
      <div className={styles.pageWrapper}>
        <div className={styles.article}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <div className={styles.title}>
                맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
              </div>
              <DropDown type="modify" />
            </div>
            <div className={styles.userAndFavorite}>
              <div className={styles.userInfo}>
                <Image src={ic_profile} alt="ic_profile" width={40} height={40} />
                <div className={styles.nameAndDate}>
                  <div className={styles.name}>총명한판다</div>
                  <div className={styles.date}>2025. 09. 24</div>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2"
                height="34"
                viewBox="0 0 2 34"
                fill="none"
              >
                <path d="M1 0V34" stroke="#E5E7EB" />
              </svg>
              <HeartTag />
            </div>
          </div>
          <div className={styles.detail}>
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
          </div>
        </div>
        <div className={styles.commentWrapper}>
          <div className={styles.addComment}>
            <div className={styles.addCommentWrapper}>
              <div className={styles.title}>댓글달기</div>
              <Textarea
                type="comment"
                size="sm"
                value={textValue}
                onChange={handleTextareaChange}
              />
            </div>
            <Button type="post" disabled={isBtnDisabled} />
          </div>
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
