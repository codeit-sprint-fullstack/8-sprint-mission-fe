import Text from "../atoms/Text";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import BasicDropdown from "../molecules/BasicDropdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export interface Writer {
  id: number;
  nickname: string;
  image: string | null;
}

export interface CommentProps {
  data: {
    id: string;
    writer?: Writer;
    content: string;
    createdAt: string;
    updatedAt?: string;
  };
  onDelete?: (commentId: string) => void;
  onUpdate?: (commentId: string, newContent: string) => void;
}

export default function Comment({ data, onDelete, onUpdate }: CommentProps) {
  const {
    id: commentId,
    writer = { id: 0, nickname: "똑똑한 판다", image: null },
    content,
    createdAt,
    updatedAt,
  } = data;
  const [isEditInputOpen, setIsEditInputOpen] = useState(false);
  const [editContent, setEditContent] = useState(content);

  dayjs.extend(relativeTime);
  dayjs.locale("ko");

  // 댓글 삭제
  const handleDelete = () => {
    if (onDelete) {
      onDelete(commentId);
    }
  };

  // 댓글 수정 팝업 열기
  const handleUpdate = () => {
    setIsEditInputOpen(true);
  };

  // 댓글 수정 처리
  const handleEditSave = (newContent: string) => {
    if (onUpdate) {
      onUpdate(commentId, newContent);
      setIsEditInputOpen(false);
    }
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
            <BasicDropdown onDelete={handleDelete} onUpdate={handleUpdate} />
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
                {writer.nickname}
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
