const Input = ({
  type = 'title',
  value = '',
  onChange = () => {},
}: {
  type: 'title';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const placeholderMap = {
    title: '제목을 입력해주세요.',
  };

  return (
    <input
      className="bg-coolGray-100 text-coolGray-800 leading[26px] placeholder:text-secondary-400 flex h-[56px] w-full items-start gap-[10px] rounded-[12px] px-6 py-4 text-base font-normal"
      placeholder={placeholderMap[type]}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
