import DropDown from '@/components/common/DropDown';
import Textarea from '@/components/common/Textarea';
import { formatTimeAgo } from '@/libs/day';
import {
  useDeleteArticleComment,
  useEditArticleComment,
} from '@/hooks/mutations/useArticleCommentMutations';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/common/Button';

const CommentReplyCard = ({
  id,
  articleId,
  content,
  updatedAt,
  type = 'article',
}: {
  id: string;
  articleId: string;
  content: string;
  updatedAt: string;
  type?: 'article' | 'product';
}) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');

  const editArticleComment = useEditArticleComment();
  const deleteArticleComment = useDeleteArticleComment();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditConfirm = () => {
    if (type === 'article') {
      editArticleComment.mutate(
        { commentId: id, content: newComment },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articleComments', articleId] });
            setIsEditing(false);
            setNewComment(content);
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
  };

  const handleDelete = () => {
    if (type === 'article') {
      deleteArticleComment.mutate(
        {
          commentId: id,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articleComments', articleId] });
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewComment(content);
  };

  return (
    <div className="border-b-solid border-b-secondary-300 bg-background-gray flex w-full flex-col justify-start gap-6 border-b pb-3">
      <div className="flex w-full items-start justify-between gap-1">
        {isEditing ? (
          <Textarea type="comment" size="xs" value={newComment} onChange={setNewComment} />
        ) : (
          <div className="text-secondary-800 text-sm leading-[24px] font-normal">{content}</div>
        )}
        {!isEditing && (
          <DropDown
            type="modify"
            handlers={{ edit: handleEdit, delete: handleDelete }}
            selected={''}
            onChange={() => {}}
          />
        )}
      </div>
      <div className="flex items-start justify-start gap-2">
        <Image src="/icons/ic_profile.svg" alt="ic_profile" width={32} height={32} />
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start gap-1">
            <div className="text-secondary-600 text-xs leading-[18px] font-normal">똑똑한판다</div>
            <div className="text-secondary-400 text-xs leading-[18px] font-normal whitespace-nowrap">
              {formatTimeAgo(updatedAt)}
            </div>
          </div>
          {isEditing && (
            <div className="flex items-center justify-end gap-2">
              <Button type="cancel" bg="none" onClick={handleCancel} />
              <Button type="edit" disabled={newComment.length === 0} onClick={handleEditConfirm} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentReplyCard;
