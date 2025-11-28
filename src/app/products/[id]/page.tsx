'use client';

import Button from '@/components/common/Button';
import DetailProductCard from '@/components/features/products/DetailProductCard';
import AddComment from '@/components/features/comments/AddComment';
import { useGetProductById } from '@/hooks/queries/useProductQueries';
import { useParams, useRouter } from 'next/navigation';
import { useGetProductComments } from '@/hooks/queries/useProductCommentQueries';
import EmptyBoard from '@/components/common/EmptyBoard';
import CommentReplyCard from '@/components/features/comments/CommentReplyCard';
import { Comment } from '@/types/comment';
import useIsMine from '@/hooks/useIsMine';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { checkIsMine } = useIsMine();

  const { data: product } = useGetProductById(id);
  const { data: comments } = useGetProductComments(id);

  const productOwnerId = product?.data?.product?.owner?.id;
  const isProductOwner = productOwnerId ? checkIsMine(productOwnerId) : false;

  const handleEditProduct = () => {
    router.push(`/products/edit/${id}`);
  };

  const handleDeleteProduct = () => {
    console.log('delete');
  };

  const handleGoBack = () => {
    router.push('/products');
  };

  return (
    <div className="mx-auto mt-[26px] mb-[277px] flex w-full max-w-[1200px] flex-col items-center gap-16">
      <div className="flex flex-col gap-10">
        <DetailProductCard
          isMine={isProductOwner}
          id={id}
          isLiked={product?.data?.product?.isLiked}
          name={product?.data?.product?.name}
          description={product?.data?.product?.description}
          price={product?.data?.product?.price}
          tags={product?.data?.product?.tags}
          likeCount={product?.data?.product?.likeCount}
          createdAt={product?.data?.product?.createdAt}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1190"
          height="1"
          viewBox="0 0 1190 1"
          fill="none"
        >
          <path d="M0 0.5L1190 0.500104" stroke="#E5E7EB" />
        </svg>
        <div className="flex flex-col gap-6">
          <AddComment id={id} type="product" />
          <div className="flex flex-col gap-6">
            {comments?.data?.comments && comments?.data?.comments.length > 0 ? (
              comments?.data?.comments?.map((comment: Comment) => (
                <CommentReplyCard
                  key={comment.id}
                  commentId={comment.id}
                  id={id}
                  content={comment.content}
                  nickname={comment.owner.nickname || '눈치빠른판다'}
                  updatedAt={comment.updatedAt}
                  ownerId={comment.owner.id}
                  type="product"
                />
              ))
            ) : (
              <EmptyBoard type="inquiry" />
            )}
          </div>
        </div>
      </div>
      <Button type="goBack" size="md" onClick={handleGoBack} />
    </div>
  );
};

export default ProductDetailPage;
