import { likeArticle, unlikeArticle } from '@/services/article.like.service';
import { useMutation } from '@tanstack/react-query';

export const useLikeArticle = () => {
  return useMutation({
    mutationFn: likeArticle,
  });
};

export const useUnlikeArticle = () => {
  return useMutation({
    mutationFn: unlikeArticle,
  });
};
