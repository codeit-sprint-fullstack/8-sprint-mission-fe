import { useState } from 'react';
import { useAddArticleComment } from '@/hooks/mutations/useArticleCommentMutations';
import { useQueryClient } from '@tanstack/react-query';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/Button';
import { useAddProductComment } from '@/hooks/mutations/useProductCommentMutation';

const AddComment = ({ id, type = 'article' }: { id: string; type?: 'article' | 'product' }) => {
  const queryClient = useQueryClient();

  const [textValue, setTextValue] = useState<string>('');
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);

  const addArticleComment = useAddArticleComment();
  const addProductComment = useAddProductComment();

  const handleTextareaChange = (value: string) => {
    setTextValue(value);
    setIsBtnDisabled(value.length === 0);
  };

  const submitArticleComment = () => {
    if (textValue.length === 0) return;

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
  };

  const submitProductComment = () => {
    if (textValue.length === 0) return;

    addProductComment.mutate(
      {
        productId: id,
        content: textValue,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['productComments', id] });
          setTextValue('');
          setIsBtnDisabled(true);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  const handleArticleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    submitArticleComment();
  };

  const handleProductSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    submitProductComment();
  };

  const handleKeyDownSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (type === 'article') {
        submitArticleComment();
      } else {
        submitProductComment();
      }
    }
  };

  return (
    <div className="mt-8 mb-12 flex flex-col items-end gap-4">
      <div className="flex w-full flex-col items-start justify-center gap-2">
        <div className="text-coolGray-900 text-base leading-[26px] font-semibold">
          {type === 'article' ? '댓글달기' : '문의하기'}
        </div>
        <Textarea
          type={type === 'article' ? 'comment' : 'productComment'}
          size="sm"
          value={textValue}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDownSubmit}
        />
      </div>
      <Button
        type="post"
        disabled={isBtnDisabled}
        onClick={type === 'article' ? handleArticleSubmit : handleProductSubmit}
      />
    </div>
  );
};

export default AddComment;
