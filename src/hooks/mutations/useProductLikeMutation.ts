import { useMutation } from '@tanstack/react-query';
import { likeProduct, unlikeProduct } from '@/services/product.like.service';

export const useLikeProduct = () => {
  return useMutation({
    mutationFn: likeProduct,
  });
};

export const useUnlikeProduct = () => {
  return useMutation({
    mutationFn: unlikeProduct,
  });
};
