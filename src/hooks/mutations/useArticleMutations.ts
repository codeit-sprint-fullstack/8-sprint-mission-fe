import { useMutation } from '@tanstack/react-query';
import { createArticle, updateArticle } from '@/services/article.service';

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: createArticle,
  });
};

export const useUpdateArticle = () => {
  return useMutation({
    mutationFn: updateArticle,
  });
};
