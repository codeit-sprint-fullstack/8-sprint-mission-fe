import { useCommentsQuery } from "@/lib/api/comments/queries";
import { UseQueryResult } from "@tanstack/react-query";
import Text from "../atoms/Text";
import Image from "next/image";
import Comment, { CommentProps } from "./Comment";

export default function CommentList({ id: articleId }: { id: string }) {
  const {
    data: comments,
    isLoading,
    isError,
    error,
  }: UseQueryResult<CommentProps[]> = useCommentsQuery.useGetComments(
    articleId
  );

  console.log(comments);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {comments && comments.length > 0 ? (
        comments?.map((comment: CommentProps) => (
          <Comment
            key={comment.id}
            articleId={articleId}
            id={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/article/reply-empty.svg"
            alt="댓글 비어있음"
            width={140}
            height={140}
          />
          <Text
            styleName="text-sm-medium"
            className="text-center"
            color="text-secondary-400"
          >
            아직 댓글이 없어요, <br />
            지금 댓글을 달아보세요!
          </Text>
        </div>
      )}
    </div>
  );
}
