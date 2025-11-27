'use client';

import { useState } from 'react';
import Image from 'next/image';

import eyeInvisible from '@/images/input/eye-invisible.svg';
import eyeVisible from '@/images/input/eye-visible.svg';
import plusIcon from '@/images/input/plusImg.svg';

interface InputProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onKeyDown?: () => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  type?: string;
  ref?: null; //이건 용도가 뭔지 까먹었습니다.
  files?: File[];
}

export default function Input({
  label,
  name,
  value,
  onChange,
  onKeyDown,
  placeholder = '',
  rows = 1,
  error = '',
  type = 'text',
  ref = null,
  files,
}: InputProps) {
  const ErrorStyle = error === '' ? 'border-1 border-black ' : 'border-1 border-[var(--error-red)]';
  const [isVisible, setIsVisible] = useState(false);
  //공통되는 prop을 묶었습니다.
  const props =
    type === 'file'
      ? {
          className: 'w-full min-w-0 rounded-[12px] bg-[var(--Cool-Gray-100)]',
          name,
          ref,
          onChange,
        }
      : {
          className:
            //문자열을 합치는 거라 띄어쓰기 중요
            ErrorStyle +
            ' h-[50px] focus:outline-none focus:border-2 w-full px-[24px] py-[12px] bg-[var(--Cool-Gray-100] resize-none overflow-hidden rounded-[12px] text-[16px] font-[400]' +
            ' placeholder:text-[var(--Secondary-400] placeholder:text-[16px] placeholder:font-[400]',
          name,
          value,
          onChange,
          onKeyDown,
          placeholder,
        };
  //textara는 기본적으로 rows={2}로 설정 되어 있다.
  //input처럼 높이를 맞추려면 rows={1}이 꼭 필요.
  //rows={1}인 textarea보다 input이 UX적으로 좋다고 판단.
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      {rows === 1 && (
        <div className="relative">
          {type === 'file' ? (
            <ImageInput files={files} props={props} />
          ) : (
            <input {...props} type={type === 'text' ? 'text' : isVisible ? 'text' : 'password'} />
          )}
          {type === 'password' && (
            <button
              className="absolute top-[50%] right-[20px] translate-y-[-50%]"
              onClick={() => setIsVisible(!isVisible)}
              type="button"
            >
              <Image src={isVisible ? eyeVisible : eyeInvisible} alt="eye-icon" />
            </button>
          )}
        </div>
      )}
      {rows > 1 && <textarea {...props} rows={rows} />}
      <div className="flex h-[32px] flex-col justify-start">
        <p className="flex items-center justify-start px-4 py-2 text-sm font-semibold text-[var(--error-red,#f74747)]">
          {error}
        </p>
      </div>
    </div>
  );
}

interface ImageInputProps {
  files?: File[];
  props: {
    className?: string;
    name: string;
    ref?: null;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

function ImageInput({ files, props }: ImageInputProps) {
  return (
    <ul className="grid h-fit w-full list-none grid-cols-2 gap-x-[24px] gap-y-[40px] p-0">
      <div className="relative h-fit w-fit">
        <input {...props} type="file" multiple accept="/image" />
        <div>
          <Image src={plusIcon} className="absolute inset-[50%] translate-[-50%]" alt="plusIcon" />
        </div>
      </div>
      {files &&
        files.map((file: File, idx: number) => {
          if (file.type.startsWith('image/')) {
            const image = URL.createObjectURL(file);
            return (
              <li
                key={idx}
                className="flex aspect-square w-full items-start gap-3 overflow-hidden rounded-[12px] border-none bg-[var(--Cool-Gray-100,#f3f4f6)]"
              >
                <img src={image} className="h-[100%] w-[100%] object-cover" />
              </li>
            );
          } else {
            return <p>{file.type}</p>;
          }
        })}
    </ul>
  );
}
