'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Button';

import styles from '@/styles/components/ArticleFormClient.module.scss';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import api from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const ArticleFormClient = ({ id }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  const isEdit = Boolean(id);

  const getArticleContent = async () => {
    const res = await api(`/articles/${id}`);
    return res.json();
  };

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

  const updateArticle = async (data) => {
    const res = await api(`/articles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return res.json();
  };

  const { data: content } = useQuery({
    queryKey: ['article', id],
    queryFn: getArticleContent,
    enabled: isEdit,
  });

  useEffect(() => {
    if (content?.data) {
      setTitle(content.data.title);
      setDetail(content.data.content);
    }
  }, [content]);

  const createMutation = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      router.push('/article');
    },
    onError: (err) => {
      alert(`게시글 작성 실패: ${err.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles', id] });
      router.push(`/article/${id}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: title,
      content: detail,
    };

    isEdit ? updateMutation.mutate(data) : createMutation.mutate(data);
  };

  return (
    <div className={styles.articlePostPage}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>게시글 쓰기</div>
        <div className={styles.headerButton}>
          <Button
            type="post"
            disabled={
              title === '' || detail === '' || createMutation.isPending || updateMutation.isPending
            }
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

export default ArticleFormClient;
