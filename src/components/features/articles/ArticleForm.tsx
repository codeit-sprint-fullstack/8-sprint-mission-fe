'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import { useCreateArticle, useUpdateArticle } from '@/hooks/mutations/useArticleMutations';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ArticleForm = ({ articleId = '' }: { articleId?: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<{ title: string; content: string }>({
    title: '',
    content: '',
  });

  const isEditMode = articleId ? true : false;

  const createArticleMutation = useCreateArticle();
  const updateArticleMutation = useUpdateArticle();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditMode) {
      updateArticleMutation.mutate(
        {
          id: articleId,
          title: formData.title,
          content: formData.content,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
            router.push(`/articles/${articleId}`);
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    } else {
      createArticleMutation.mutate(
        {
          title: formData.title,
          content: formData.content,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
            router.push(`/articles/${articleId}`);
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
  };

  return (
    <form
      className="mx-auto mt-[24px] mb-[794px] flex max-w-[1200px] flex-col gap-8"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full items-center justify-between">
        <div className="text-secondary-800 text-xl leading-[32px] font-bold">게시글 쓰기</div>
        <Button
          type="post"
          disabled={formData.title.length === 0 || formData.content.length === 0}
        />
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-3">
          <div className="text-secondary-800 text-lg leading-[26px] font-bold">제목</div>
          <Input
            type="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="text-secondary-800 text-lg leading-[26px] font-bold">내용</div>
          <Textarea
            type="detail"
            size="lg"
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
        </div>
      </div>
    </form>
  );
};

export default ArticleForm;
