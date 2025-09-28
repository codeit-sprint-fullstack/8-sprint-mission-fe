import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { commentsApi } from "./fetchers";

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
const useGetComments = (id: string): UseQueryResult => {
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

export const useCommentsQuery = {
  useCreateComment,
  useGetComments,
  useDeleteComment,
  useUpdateComment,
};
