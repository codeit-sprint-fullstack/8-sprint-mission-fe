import Text from "../atoms/Text";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import BasicDropdown from "../molecules/BasicDropdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useCommentsQuery } from "@/lib/api/comments/queries";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export interface CommentProps {
  articleId: string;
  id: string;
  content: string;
  createdAt: string;
}

export default function Comment({
  articleId,
  id: commentId,
  content,
  createdAt,
}: CommentProps) {
  const [isEditInputOpen, setIsEditInputOpen] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const queryClient = useQueryClient();
  const router = useRouter();
  dayjs.extend(relativeTime);
  dayjs.locale("ko");

  // 댓글 삭제
  const {
    mutate: deleteComment,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
  } = useCommentsQuery.useDeleteComment();

  // 댓글 수정
  const {
    mutate: updateComment,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useCommentsQuery.useUpdateComment();

  // 댓글 삭제
  const onDelete = () => {
    deleteComment(
      { articleId, commentId },
      {
        onSuccess: () => {
          router.refresh();
          queryClient.invalidateQueries({ queryKey: ["comments"] });
          console.log("댓글이 성공적으로 삭제되었습니다.");
        },
        onError: (error) => {
          console.log("delete error", error);
        },
      }
    );
  };

  // 댓글 수정 팝업 열기
  const onUpdate = () => {
    setIsEditInputOpen(true);
  };

  // 댓글 수정 처리
  const handleEditSave = (newContent: string) => {
    updateComment(
      { articleId, commentId, comment: newContent },
      {
        onSuccess: () => {
          router.refresh();
          queryClient.invalidateQueries({ queryKey: ["comments"] });
          setIsEditInputOpen(false);
          console.log("댓글이 성공적으로 수정되었습니다.");
        },
        onError: (error) => {
          console.log("update error", error);
        },
      }
    );
  };

  // 상대적인 시간 계산
  const getRelativeTime = (createdAt: string) => {
    const now = dayjs();
    const created = dayjs(createdAt);
    const diffInMinutes = now.diff(created, "minute");
    const diffInHours = now.diff(created, "hour");
    const diffInDays = now.diff(created, "day");

    if (diffInMinutes < 1) {
      return "방금 전";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    } else {
      return created.format("YYYY. MM. DD.");
    }
  };

  if (isDeletePending) {
    return <div>댓글 삭제 중</div>;
  }
  if (isDeleteError) {
    return <div>Error: {deleteError.message}</div>;
  }
  if (isUpdatePending) {
    return <div>댓글 수정 중</div>;
  }
  if (isUpdateError) {
    return <div>Error: {updateError.message}</div>;
  }

  return (
    <div className="bg-(--background-color) border-b border-secondary-300 p-4">
      <div className="flex justify-between items-start mb-6">
        {isEditInputOpen ? (
          <Textarea
            className="w-full min-h-[80px] p-4 rounded-lg resize-none text-secondary-800 bg-(--secondary-color-100)"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <>
            <Text styleName="text-md-regular" color="text-secondary-800">
              {content}
            </Text>
            <BasicDropdown onDelete={onDelete} onUpdate={onUpdate} />
          </>
        )}
      </div>
      <div className="flex items-center gap-3 flex-1">
        <Avatar className="rounded-lg">
          <AvatarImage
            src={"/article/avatar-img.svg"}
            alt={"avatar"}
            width={32}
            height={32}
            className="rounded-lg"
          />
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-center mb-2">
              <Text styleName="text-sm-medium" color="text-secondary-800">
                똑똑한 판다
              </Text>
              <Text styleName="text-xs-regular" color="text-secondary-400">
                {getRelativeTime(createdAt)}
              </Text>
            </div>
            {isEditInputOpen && (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsEditInputOpen(false)}
                >
                  취소
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleEditSave(editContent)}
                >
                  수정
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
