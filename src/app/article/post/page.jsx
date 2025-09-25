'use client';

import { useState } from 'react';
import Button from '@/components/Button';

import styles from '@/styles/pages/ArticlePostPage.module.scss';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import api from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const ArticlePostPage = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  const createArticle = async (data) => {
    const res = await api('/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return res.json();
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      router.push('/article');
    },
    onError: (err) => {
      alert(`게시글 작성 실패: ${err.message}`);
    },
  });

  const handleSubmit = () => {
    const newArticle = {
      title: title,
      content: detail,
    };

    mutation.mutate(newArticle);
  };

  return (
    <div className={styles.articlePostPage}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>게시글 쓰기</div>
        <div className={styles.headerButton}>
          <Button
            type="post"
            disabled={title === '' || detail === '' || mutation.isPending}
            onClick={handleSubmit}
          />
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.contentTitle}>
          <div className={styles.title}>*제목</div>
          <Input type="title" value={title} onChange={setTitle} />
        </div>
        <div className={styles.contentDetail}>
          <div className={styles.title}>*내용</div>
          <Textarea type="detail" size="lg" value={detail} onChange={setDetail} />
        </div>
      </div>
    </div>
  );
};

export default ArticlePostPage;
