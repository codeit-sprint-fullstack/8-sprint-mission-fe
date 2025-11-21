import { useState } from 'react';
import { useAddArticleComment } from '@/hooks/mutations/useArticleCommentMutations';
import { useQueryClient } from '@tanstack/react-query';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/Button';

const AddComment = ({ id, type = 'article' }: { id: string; type?: 'article' | 'product' }) => {
  const queryClient = useQueryClient();

  const [textValue, setTextValue] = useState<string>('');
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);
  const addArticleComment = useAddArticleComment();

  const handleTextareaChange = (value: string) => {
    setTextValue(value);
    setIsBtnDisabled(value.length === 0);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (type === 'article') {
      addArticleComment.mutate(
        {
          articleId: id,
          content: textValue,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articleComments', id] });
            setTextValue('');
            setIsBtnDisabled(true);
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
  };

  return (
    <div className="mt-8 mb-12 flex flex-col items-end gap-4">
      <div className="flex w-full flex-col items-start justify-center gap-2">
        <div className="text-coolGray-900 text-base leading-[26px] font-semibold">댓글달기</div>
        <Textarea type="comment" size="sm" value={textValue} onChange={handleTextareaChange} />
      </div>
      <Button type="post" disabled={isBtnDisabled} onClick={handleSubmit} />
    </div>
  );
};

export default AddComment;
