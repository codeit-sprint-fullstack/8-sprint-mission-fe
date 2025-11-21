import {
  deleteArticleComment,
  editArticleComment,
  addArticleComment,
} from '@/services/article.comment.service';
import { useMutation } from '@tanstack/react-query';

export const useEditArticleComment = () => {
  return useMutation({
    mutationFn: editArticleComment,
  });
};

export const useDeleteArticleComment = () => {
  return useMutation({
    mutationFn: deleteArticleComment,
  });
};

export const useAddArticleComment = () => {
  return useMutation({
    mutationFn: addArticleComment,
  });
};
