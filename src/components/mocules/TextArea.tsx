'use client';

interface TextAreaProps {
  rows: number;
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: () => void;
  placeholder?: string;
  error?: string;
}

export default function TextArea({
  rows,
  label,
  name,
  value,
  onChange,
  onKeyDown,
  placeholder = '',
  error = '',
}: TextAreaProps) {
  const ErrorStyle =
    error === ''
      ? 'focus:border-2 focus:border-black outline-none'
      : 'border-1 focus:border-2 border-[var(--error-red)] outline-none';
  //공통되는 prop을 묶었습니다.
  const props = {
    className:
      //문자열을 합치는 거라 띄어쓰기 중요
      ErrorStyle +
      ' w-full px-[24px] py-[12px] bg-[var(--Cool-Gray-100)] resize-none overflow-hidden rounded-[12px] text-[16px] font-[400]' +
      ' placeholder:text-[var(--Cool-Gray-400] placeholder:text-[16px] placeholder:font-[400]',
    name,
    value,
    onChange,
    onKeyDown,
    placeholder,
    rows,
  };
  return (
    <div className="flex flex-col">
      <label className="mb-[8px]">{label}</label>
      <textarea {...props} />
      <div className="flex h-[32px] flex-col justify-start">
        <p className="flex items-center justify-start px-[16px] py-[8px] text-sm font-semibold text-[var(--error-red,#f74747)]">
          {error}
        </p>
      </div>
    </div>
  );
}
