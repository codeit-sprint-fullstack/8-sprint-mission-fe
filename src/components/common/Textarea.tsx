import clsx from 'clsx';

const Textarea = ({
  type = 'detail',
  size = 'lg',
  value = '',
  onChange = () => {},
}: {
  type: 'detail' | 'comment';
  size: 'xs' | 'sm' | 'lg';
  value: string;
  onChange: (value: string) => void;
}) => {
  const typeMap = {
    detail: '내용을 입력해주세요',
    comment: '댓글을 입력해주세요',
    editComment: '',
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
    ></textarea>
  );
};

export default Textarea;
