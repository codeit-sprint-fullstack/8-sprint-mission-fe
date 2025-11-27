'use client';

import { useRouter, useParams } from 'next/navigation';
import { useGetArticleComments } from '@/hooks/queries/useArticleCommentQueries';
import { Comment } from '@/types/comment';

import EmptyBoard from '@/components/common/EmptyBoard';
import Button from '@/components/common/Button';
import DetailArticleCard from '@/components/features/articles/DetailArticleCard';
import CommentReplyCard from '@/components/features/comments/CommentReplyCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import AddComment from '@/components/features/comments/AddComment';

interface Params {
  id: string;
  [key: string]: string | string[] | undefined;
}

const DetailArticlePage = () => {
  const router = useRouter();
  const params = useParams<Params>();
  const { id } = params;

  const { data: comments, isLoading } = useGetArticleComments(id);

  const handleGoBack = () => {
    router.push('/articles');
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="mx-auto mt-[34px] mb-[193px] max-w-[1200px]">
        <div className="w-full">
          <DetailArticleCard id={id} />
          <div>
            <AddComment id={id} type="article" />
            <div>
              {comments?.data?.comments && comments?.data?.comments.length > 0 ? (
                comments?.data?.comments.map((comment: Comment) => (
                  <CommentReplyCard
                    key={comment.id}
                    id={id}
                    commentId={comment.id}
                    content={comment.content}
                    updatedAt={comment.updatedAt}
                    type="article"
                  />
                ))
              ) : (
                <EmptyBoard type="comment" />
              )}
            </div>
          </div>
          <div className="mt-[64px] flex justify-center">
            <Button type="goBack" size="md" onClick={handleGoBack} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailArticlePage;
