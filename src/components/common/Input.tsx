const Input = ({
  type = 'text',
  placeholder = '',
  name = '',
  value = '',
  onChange = () => {},
  onKeyDown,
  disabled = false,
}: {
  type: string;
  placeholder: string;
  name?: string;
  value: string | number | string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) => {
  return (
    <input
      className="bg-coolGray-100 text-coolGray-800 leading[26px] placeholder:text-secondary-400 flex h-[56px] w-full items-start gap-[10px] rounded-[12px] px-6 py-4 text-base font-normal"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
    />
  );
};

export default Input;
