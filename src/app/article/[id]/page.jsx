'use client';

import Button from '@/components/Button';
import CommentReplyCard from '@/components/CommentReplyCard';

import styles from '@/styles/pages/DetailArticlePage.module.scss';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyBoard from '@/components/EmptyBoard';
import DetailArticleCard from '@/components/DetailArticleCard';
import AddComment from '@/components/AddComment.jsx';

const DetailArticlePage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const getComments = async (id) => {
    const res = await api(`/comments/article/${id}`);
    return res.json();
  };

  const {
    data: comments,
    isLoading: isCommentLoading,
    error: commentError,
    isFetching: isCommentFetching,
  } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getComments(id),
  });

  const handleGoBack = () => {
    router.push('/article');
  };

  return (
    <div className={styles.detailArticlePage}>
      <div className={styles.pageWrapper}>
        <DetailArticleCard id={id} />
        <div className={styles.commentWrapper}>
          <AddComment id={id} />
          <div className={styles.commentBox}>
            {(isCommentLoading || isCommentFetching) && <LoadingSpinner fullscreen={false} />}
            {comments?.data && comments.data.length > 0 ? (
              comments.data.map((comment) => (
                <CommentReplyCard
                  key={comment.id}
                  id={comment.id}
                  articleId={id}
                  content={comment.content}
                  updatedAt={comment.updatedAt}
                />
              ))
            ) : (
              <EmptyBoard />
            )}
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button type="goBack" size="md" onClick={handleGoBack} />
        </div>
      </div>
    </div>
  );
};

export default DetailArticlePage;
