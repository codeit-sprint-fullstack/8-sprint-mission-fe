'use client';

import { useState } from 'react';

import Button from '@/components/Button.jsx';
import Textarea from '@/components/Textarea.jsx';

import styles from '@/styles/components/AddComment.module.scss';
import api from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AddComment = ({ id = '' }) => {
  const queryClient = useQueryClient();

  const [textValue, setTextValue] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const addComment = async (data) => {
    const res = await api('/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return res.json();
  };

  const addMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'], id });
    },
  });

  const handleTextareaChange = (value) => {
    setTextValue(value);
    setIsBtnDisabled(value.trim().length === 0);
  };

  const handleButton = (e) => {
    e.preventDefault();

    const data = {
      content: textValue,
      articleId: id,
    };

    addMutation.mutate(data);
  };

  return (
    <div className={styles.addComment}>
      <div className={styles.addCommentWrapper}>
        <div className={styles.title}>댓글달기</div>
        <Textarea type="comment" size="sm" value={textValue} onChange={handleTextareaChange} />
      </div>
      <Button type="post" disabled={isBtnDisabled} onClick={handleButton} />
    </div>
  );
};

export default AddComment;
