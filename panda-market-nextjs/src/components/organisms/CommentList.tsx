import Text from "../atoms/Text";
import Image from "next/image";
import type { Comment as CommentType } from "@/lib/api/comments/fetchers";
import Comment from "./Comment";

export interface CommentListProps {
  id: string;
  data: CommentType[];
  isLoading: boolean;
  isError: boolean;
  error: Error;
  onDeleteComment?: (commentId: string) => void;
  onUpdateComment?: (commentId: string, comment: string) => void;
}

export default function CommentList({
  id,
  data,
  isLoading,
  isError,
  error,
  onDeleteComment,
  onUpdateComment,
}: CommentListProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {data && data.length > 0 ? (
        data.map((comment) => (
          <Comment
            key={comment.id}
            data={{
              ...comment,
            }}
            onDelete={() => onDeleteComment?.(comment.id)}
            onUpdate={(commentId, newContent) =>
              onUpdateComment?.(commentId, newContent)
            }
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
