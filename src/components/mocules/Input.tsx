'use client';

//훅
import { Ref, useState } from 'react';

//이미지
import Image from 'next/image';
import eyeInvisible from '@/images/input/eye-invisible.svg';
import eyeVisible from '@/images/input/eye-visible.svg';
import plusIcon from '@/images/input/plusImg.svg';

interface InputProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  ref?: Ref<HTMLInputElement>;
  files?: File[];
}

export default function Input({
  label,
  name,
  value,
  onChange,
  onKeyDown,
  placeholder = '',
  error = '',
  type = 'text',
  ref = null,
  files,
}: InputProps) {
  const ErrorStyle =
    error === ''
      ? 'focus:border-2 focus:border-black outline-none'
      : 'border-1 focus:border-2 border-[var(--error-red)] outline-none';
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
            ' h-[50px] w-full px-[24px] py-[12px] bg-[var(--Cool-Gray-100)] resize-none overflow-hidden rounded-[12px] text-[16px] font-[400]' +
            ' placeholder:text-[var(--Cool-Gray-400] placeholder:text-[16px] placeholder:font-[400]',
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
      <label className="mb-[8px] text-[var(--Cool-Gray-900)] text-[16px] font-[600]">{label}</label>
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
      {type !== 'file' && (
        <div className="flex h-[32px] flex-col justify-start">
          <p className="flex items-center justify-start px-4 py-2 text-sm font-semibold text-[var(--error-red,#f74747)]">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

interface ImageInputProps {
  files?: File[];
  props: {
    className?: string;
    name: string;
    ref?: Ref<HTMLInputElement>;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

function ImageInput({ files, props }: ImageInputProps) {
  return (
    <div>
      <ul className="grid h-fit w-full list-none grid-cols-4 gap-x-[24px] gap-y-[40px] p-0">
        <li className="relative flex aspect-square w-full items-center justify-center gap-3 overflow-hidden rounded-[12px] border-none bg-[var(--Cool-Gray-100)]">
          <input
            {...props}
            id="ImageInput"
            type="file"
            multiple
            accept="/image"
            className="w-full h-full text-transparent cursor-pointer"
          />
          <label
            htmlFor="ImageInput"
            className="absolute flex flex-col gap-[12px] items-center h-fit w-fit cursor-pointer"
          >
            <Image src={plusIcon} className="" alt="plusIcon" />
            <p className="text-[var(--Cool-Gray-400)] text-[16px] font-[400]">이미지 등록</p>
          </label>
        </li>
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
      <p className="text-[var(--Cool-Gray-500)] text-[16px] font-[400] p-[12px]">
        {' '}
        상품 이미지는 한번에 최대 3장까지만 등록 가능합니다.{' '}
      </p>
    </div>
  );
}
