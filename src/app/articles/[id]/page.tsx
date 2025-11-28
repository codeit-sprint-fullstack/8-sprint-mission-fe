'use client';

import { useRouter, useParams } from 'next/navigation';
import { useGetArticleComments } from '@/hooks/queries/useArticleCommentQueries';
import { useGetDetailArticle } from '@/hooks/queries/useArticleQueries';
import { Comment } from '@/types/comment';

import EmptyBoard from '@/components/common/EmptyBoard';
import Button from '@/components/common/Button';
import DetailArticleCard from '@/components/features/articles/DetailArticleCard';
import CommentReplyCard from '@/components/features/comments/CommentReplyCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import AddComment from '@/components/features/comments/AddComment';
import useIsMine from '@/hooks/useIsMine';

interface Params {
  id: string;
  [key: string]: string | string[] | undefined;
}

const DetailArticlePage = () => {
  const router = useRouter();
  const params = useParams<Params>();
  const { id } = params;
  const { checkIsMine } = useIsMine();

  const { data: article, isLoading: isArticleLoading } = useGetDetailArticle(id);
  const { data: comments, isLoading: isCommentsLoading } = useGetArticleComments(id);

  const articleOwnerId = article?.data?.article?.owner?.id;
  const isArticleOwner = articleOwnerId ? checkIsMine(articleOwnerId) : false;

  const isLoading = isArticleLoading || isCommentsLoading;

  const handleGoBack = () => {
    router.push('/articles');
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="mx-auto mt-[34px] mb-[193px] max-w-[1200px]">
        <div className="w-full">
          <DetailArticleCard
            id={id}
            title={article?.data?.article?.title || ''}
            content={article?.data?.article?.content || ''}
            nickname={article?.data?.article?.owner?.nickname || ''}
            likeCount={article?.data?.article?.likeCount || 0}
            createdAt={article?.data?.article?.createdAt || ''}
            isMine={isArticleOwner}
          />
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
                    nickname={comment.owner.nickname || '눈치빠른판다'}
                    updatedAt={comment.updatedAt}
                    ownerId={comment.owner.id}
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
