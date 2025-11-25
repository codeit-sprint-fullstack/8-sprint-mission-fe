'use client';

import Button from '@/components/common/Button';
import DetailProductCart from '@/components/features/products/DetailProductCart';
import AddComment from '@/components/features/comments/AddComment';
import { useGetProductById } from '@/hooks/queries/useProductQueries';
import { useParams, useRouter } from 'next/navigation';
import { useGetProductComments } from '@/hooks/queries/useProductCommentQueries';
import EmptyBoard from '@/components/common/EmptyBoard';
import CommentReplyCard from '@/components/features/comments/CommentReplyCard';
import { Comment } from '@/types/comment';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: product } = useGetProductById(id);
  const { data: comments } = useGetProductComments(id);

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
        <DetailProductCart
          name={product?.data?.name}
          description={product?.data?.description}
          price={product?.data?.price}
          tags={product?.data?.tags}
          likeCount={product?.data?.likeCount}
          createdAt={product?.data?.createdAt}
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
            {comments?.data && comments?.data.length > 0 ? (
              comments?.data.map((comment: Comment) => (
                <CommentReplyCard
                  key={comment.id}
                  commentId={comment.id}
                  id={id}
                  content={comment.content}
                  updatedAt={comment.updatedAt}
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
