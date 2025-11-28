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
import {
  useDeleteProductComment,
  useEditProductComment,
} from '@/hooks/mutations/useProductCommentMutation';
import useIsMine from '@/hooks/useIsMine';

const CommentReplyCard = ({
  commentId,
  id,
  content,
  nickname,
  updatedAt,
  ownerId,
  type = 'article',
}: {
  commentId: string;
  id: string;
  content: string;
  nickname: string;
  updatedAt: string;
  ownerId?: string;
  type?: 'article' | 'product';
}) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const { checkIsMine } = useIsMine();

  const editArticleComment = useEditArticleComment();
  const deleteArticleComment = useDeleteArticleComment();
  const editProductComment = useEditProductComment();
  const deleteProductComment = useDeleteProductComment();

  const isCommentOwner = ownerId ? checkIsMine(ownerId) : false;

  const handleEdit = () => {
    setIsEditing(true);
    setNewComment(content);
  };

  const handleEditConfirm = () => {
    if (type === 'article') {
      editArticleComment.mutate(
        { commentId: commentId, content: newComment },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articleComments', id] });
            setIsEditing(false);
            setNewComment(content);
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
    if (type === 'product') {
      editProductComment.mutate(
        { commentId: commentId, content: newComment },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productComments', id] });
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
          commentId: commentId,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articleComments', id] });
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
    if (type === 'product') {
      deleteProductComment.mutate(
        { commentId: commentId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productComments', id] });
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
    <div className="border-b-solid border-b-secondary-300 bg-background-gray flex w-full flex-col justify-start gap-6 border-b p-1 pb-3">
      <div className="flex w-full items-start justify-between gap-1">
        {isEditing ? (
          <Textarea type="comment" size="xs" value={newComment} onChange={setNewComment} />
        ) : (
          <div className="text-secondary-800 text-sm leading-[24px] font-normal">{content}</div>
        )}
        {!isEditing && isCommentOwner && (
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
            <div className="text-secondary-600 text-xs leading-[18px] font-normal">{nickname}</div>
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
