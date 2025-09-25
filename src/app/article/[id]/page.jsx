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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { convertTz } from '@/lib/dayjs';

const DetailArticlePage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [textValue, setTextValue] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const getDetailArticle = async () => {
    const res = await api(`/articles/${id}`);
    return res.json();
  };

  const deleteArticle = async (id) => {
    const res = await api(`/articles/${id}`, {
      method: 'DELETE',
    });

    return res.json();
  };

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['article'],
    queryFn: getDetailArticle,
  });

  const deleteMutate = useMutation({
    mutationFn: (id) => deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      router.push('/article');
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const handleTextareaChange = (value) => {
    setTextValue(value);
    setIsBtnDisabled(value.trim().length === 0);
  };

  const handleEdit = () => {
    router.push(`/article/edit/${id}`);
  };

  const handleDelete = () => {
    deleteMutate.mutate(id);
  };

  const handleGoBack = () => {
    router.push('/article');
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  return (
    <div className={styles.detailArticlePage}>
      <div className={styles.pageWrapper}>
        <div className={styles.article}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <div className={styles.title}>{article.data.title}</div>
              <DropDown
                type="modify"
                handlers={{
                  edit: handleEdit,
                  delete: handleDelete,
                }}
              />
            </div>
            <div className={styles.userAndFavorite}>
              <div className={styles.userInfo}>
                <Image src={ic_profile} alt="ic_profile" width={40} height={40} />
                <div className={styles.nameAndDate}>
                  <div className={styles.name}>총명한판다</div>
                  <div className={styles.date}>{convertTz(article.data.createdAt)}</div>
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
          <div className={styles.detail}>{article.data.content}</div>
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
          <Button type="goBack" size="md" onClick={handleGoBack} />
        </div>
      </div>
    </div>
  );
};

export default DetailArticlePage;
