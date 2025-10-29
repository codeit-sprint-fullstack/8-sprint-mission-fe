import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { commentsApi } from "./fetchers";
import type { Comment } from "./fetchers";

/**
 * 댓글 생성
 * @returns Comment
 */
const useCreateComment = (): UseMutationResult<
  Comment,
  Error,
  { id: string; comment: string }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      commentsApi.createComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

/**
 * 댓글 조회
 * @returns Comment
 */
const useGetComments = (id: string): UseQueryResult<Comment[], Error> => {
  return useQuery({
    queryKey: ["comments", id],
    queryFn: () => commentsApi.getComments(id),
  });
};

/**
 * 댓글 삭제
 * @returns Comment
 */
const useDeleteComment = (): UseMutationResult<
  number,
  Error,
  { articleId: string; commentId: string }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      articleId,
      commentId,
    }: {
      articleId: string;
      commentId: string;
    }) => commentsApi.deleteComment(articleId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

/**
 * 댓글 수정
 * @returns Comment
 */
const useUpdateComment = (): UseMutationResult<
  Comment,
  Error,
  { articleId: string; commentId: string; comment: string }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      articleId,
      commentId,
      comment,
    }: {
      articleId: string;
      commentId: string;
      comment: string;
    }) => commentsApi.updateComment(articleId, commentId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

/**
 * 상품 댓글 목록 조회
 * @returns Comment
 */
const useGetProductComments = (
  id: string
): UseQueryResult<Comment[], Error> => {
  return useQuery({
    queryKey: ["productComments", id],
    queryFn: () => commentsApi.getProductComments(id),
  });
};

/**
 * 상품 댓글 등록
 * @returns Comment
 */
const useCreateProductComment = (): UseMutationResult<
  Comment,
  Error,
  { id: string; comment: string }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      commentsApi.createProductComment(id, comment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["productComments", variables.id],
      });
    },
  });
};

/**
 * 상품 댓글 수정
 * @returns Comment
 */
const useUpdateProductComment = (): UseMutationResult<
  Comment,
  Error,
  { id: string; commentId: string; comment: string }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      commentId,
      comment,
    }: {
      id: string;
      commentId: string;
      comment: string;
    }) => commentsApi.updateProductComment(id, commentId, comment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["productComments", variables.id],
      });
    },
  });
};

/**
 * 상품 댓글 삭제
 * @returns Comment
 */
const useDeleteProductComment = (): UseMutationResult<
  number,
  Error,
  { id: string; commentId: string }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, commentId }: { id: string; commentId: string }) =>
      commentsApi.deleteProductComment(id, commentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["productComments", variables.id],
      });
    },
  });
};

export const useCommentsQuery = {
  useCreateComment,
  useGetComments,
  useDeleteComment,
  useUpdateComment,
  useGetProductComments,
  useCreateProductComment,
  useUpdateProductComment,
  useDeleteProductComment,
};
