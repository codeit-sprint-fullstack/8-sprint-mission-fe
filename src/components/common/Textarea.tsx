import clsx from 'clsx';

const Textarea = ({
  type = 'detail',
  size = 'lg',
  value = '',
  onChange = () => {},
  onKeyDown,
}: {
  type: 'detail' | 'comment' | 'productComment' | 'productDescription';
  size: 'xs' | 'sm' | 'lg';
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}) => {
  const typeMap = {
    detail: '내용을 입력해주세요',
    comment: '댓글을 입력해주세요',
    productComment:
      '개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.',
    editComment: '',
    productDescription: '상품 소개를 입력해주세요',
  };

  const sizeClassMap = {
    xs: 'h-[80px] text-coolGray-800 text-sm font-normal leading-[24px]',
    sm: 'h-[104px]',
    lg: 'h-[282px]',
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;
    onChange(textValue);
  };

  return (
    <textarea
      placeholder={typeMap[type]}
      className={clsx(
        sizeClassMap[size],
        'bg-coolGray-100 flex w-full items-center rounded-[12px] px-6 py-4 outline-none',
      )}
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    ></textarea>
  );
};

export default Textarea;
