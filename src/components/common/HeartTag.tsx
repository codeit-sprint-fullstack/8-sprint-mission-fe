import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { useLikeArticle, useUnlikeArticle } from '@/hooks/mutations/useArticleLikeMutation';
import { useLikeProduct, useUnlikeProduct } from '@/hooks/mutations/useProductLikeMutation';

const ic_heart_inactive = '/icons/ic_heart_inactive.svg';
const ic_heart_active = '/icons/ic_heart_active.svg';

const HeartTag = ({
  like = 0,
  isLiked = false,
  articleId = '',
  productId = '',
}: {
  like: number;
  isLiked: boolean;
  articleId?: string;
  productId?: string;
}) => {
  const queryClient = useQueryClient();

  const likeArticleMutation = useLikeArticle();
  const unlikeArticleMutation = useUnlikeArticle();
  const likeProductMutation = useLikeProduct();
  const unlikeProductMutation = useUnlikeProduct();

  const handleLike = () => {
    if (!!articleId) {
      likeArticleMutation.mutate(
        { articleId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['article', articleId] });
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    } else if (!!productId) {
      likeProductMutation.mutate(
        { productId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product', productId] });
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
  };

  const handleUnlike = () => {
    if (!!articleId) {
      unlikeArticleMutation.mutate(
        {
          articleId,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['article', articleId] });
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    } else if (!!productId) {
      unlikeProductMutation.mutate(
        {
          productId,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product', productId] });
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
  };

  return (
    <button
      onClick={isLiked ? handleUnlike : handleLike}
      className="border-secondary-200 flex h-[40px] cursor-pointer items-center justify-center gap-1 rounded-[35px] border-[1px] border-solid px-3 py-1"
    >
      <Image
        src={isLiked ? ic_heart_active : ic_heart_inactive}
        alt="ic_heart"
        width={32}
        height={32}
      />
      <div className="text-coolGray-500 text-base leading-[26px] font-normal">{like}</div>
    </button>
  );
};

export default HeartTag;
