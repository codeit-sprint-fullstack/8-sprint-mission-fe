'use client';

import Image from 'next/image';
import DropDown from '@/components/DropDown.jsx';
import ic_profile from '/public/icons/ic_profile.svg';
import { formatTimeAgo } from '@/lib/dayjs.js';

import styles from '@/styles/components/CommentReplyCard.module.scss';
import api from '@/lib/api.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import Textarea from './Textarea';

const CommentReplyCard = ({ id = '', articleId = '', content = '', updatedAt = '' }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(content);

  const editComment = async (data) => {
    const res = await api(`/comments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  };

  const deleteComment = async () => {
    const res = await api(`/comments/${id}`, {
      method: 'DELETE',
    });

    return await res.json();
  };

  const editMutation = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId], refetchType: 'active, ' });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId], refetchType: 'active' });
    },
  });

  const handleEdit = () => {
    console.log('edit');
    setIsEditing(true);
  };

  const handleEditConfirm = () => {
    const data = {
      content: newComment,
    };

    editMutation.mutate(data);

    setIsEditing(false);
    setNewComment(content);
  };

  const handleDelete = () => {
    console.log('delete');
    deleteMutation.mutate();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewComment(content);
  };

  return (
    <div className={styles.replyCard}>
      <div className={styles.comment}>
        {isEditing ? (
          <Textarea type="editComment" size="xs" value={newComment} onChange={setNewComment} />
        ) : (
          <div className={styles.detail}>{content}</div>
        )}
        {!isEditing && (
          <DropDown type="modify" handlers={{ edit: handleEdit, delete: handleDelete }} />
        )}
      </div>
      <div className={styles.userInfo}>
        <Image
          className={styles.userProfile}
          src={ic_profile}
          alt="ic_profile"
          width={32}
          height={32}
        />
        <div className={styles.editWrapper}>
          <div className={styles.user}>
            <div className={styles.userName}>똑똑한판다</div>
            <div className={styles.timeAgo}>{formatTimeAgo(updatedAt)}</div>
          </div>
          {isEditing && (
            <div className={styles.editButtonWrapper}>
              <Button type="cancel" bg="none" onClick={handleCancel} />
              <Button type="edit" disabled={false} onClick={handleEditConfirm} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentReplyCard;
