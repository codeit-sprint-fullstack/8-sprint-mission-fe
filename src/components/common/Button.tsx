import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const Button = ({
  type = 'login',
  size = 'sm',
  bg = 'primary-100',
  disabled = false,
  onClick = () => {},
}: {
  type:
    | 'login'
    | 'write'
    | 'post'
    | 'explore'
    | 'edit'
    | 'cancel'
    | 'signup'
    | 'confirm'
    | 'logout'
    | 'goBack';
  size?: 'sm' | 'md' | 'lg' | 'modal';
  bg?: 'primary-100' | 'primary-200' | 'primary-300' | 'none';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const typeMap = {
    login: '로그인',
    write: '글쓰기',
    post: '등록',
    explore: '구경하러 가기',
    edit: '수정 완료',
    cancel: '취소',
    signup: '회원가입',
    confirm: '확인',
    logout: '로그아웃',
  };

  const baseButtonClass =
    'inline-flex items-center justify-center h-[42px] px-[23px] rounded-[8px] text-coolGray-100 text-base font-semibold leading-[26px] cursor-pointer';

  const sizeClassMap = {
    sm: '',
    md: 'w-[240px] h-[48px] px-[71px] rounded-[40px]',
    lg: 'w-full h-[56px] px-[124px] rounded-[40px]',
    modal: 'w-[165px] h-[48px] px-[23px] rounded-[8px]',
  };

  const bgClassMap = {
    'primary-100': 'bg-primary-100',
    'primary-200': 'bg-primary-200',
    'primary-300': 'bg-primary-300',
    none: '',
  };

  const disabledClass = 'bg-coolGray-400 cursor-not-allowed';

  if (type === 'goBack') {
    return (
      <button
        className={clsx(
          baseButtonClass,
          'gap-2',
          sizeClassMap[size],
          disabled ? disabledClass : bgClassMap[bg],
        )}
        onClick={onClick}
      >
        <div className="whitespace-nowrap">목록으로 돌아가기</div>
        <Image src="/icons/ic_back.svg" alt="ic_back" width={24} height={24} />
      </button>
    );
  }

  return (
    <button
      type={type === 'login' || type === 'signup' || type === 'post' ? 'submit' : 'button'}
      disabled={disabled}
      className={clsx(
        baseButtonClass,
        sizeClassMap[size],
        disabled ? disabledClass : bgClassMap[bg],
      )}
      onClick={onClick}
    >
      {typeMap[type]}
    </button>
  );
};

export default Button;
