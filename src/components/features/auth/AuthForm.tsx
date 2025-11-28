'use client';

import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormValues, SignupFormValues, loginSchema, signupSchema } from '@/schema/authSchema';

import Button from '@/components/common/Button';
import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';
import { useLogin, useSignup } from '@/hooks/useAuth';

const AuthForm = ({ type = null }: { type: 'login' | 'signup' | null }) => {
  const { login } = useLogin();
  const { signup } = useSignup();
  const schema = type === 'login' ? loginSchema : signupSchema;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues | SignupFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const handleLoginSubmit = async (data: LoginFormValues | SignupFormValues) => {
    if (type === 'login') {
      const loginData: LoginFormValues = data;
      await login({ email: loginData.email, password: loginData.password });
    }
    if (type === 'signup') {
      const signupData = data as SignupFormValues;
      await signup({
        email: signupData.email,
        nickname: signupData.nickname,
        password: signupData.password,
        passwordConfirm: signupData.confirmPassword,
      });
    }
  };

  const signupErrors = type === 'signup' ? (errors as FieldErrors<SignupFormValues>) : null;

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <label className="text-secondary-800 text-lg leading-[26px] font-bold">이메일</label>
        <input
          type="email"
          placeholder="이메일을 입력해주세요."
          {...register('email')}
          className={clsx(
            'bg-coolGray-100 flex w-full items-center rounded-[12px] border border-solid border-transparent px-6 py-4 outline-none focus:outline-none',
            errors.email ? 'focus:border-error-red' : 'focus:border-primary-100',
          )}
        />
        {errors.email && (
          <p className="text-error-red text-sm leading-[24px] font-semibold">
            {errors.email.message}
          </p>
        )}
      </div>
      {type === 'signup' && (
        <div className="flex flex-col gap-4">
          <label className="text-secondary-800 text-lg leading-[26px] font-bold">닉네임</label>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요."
            {...register('nickname')}
            className={clsx(
              'bg-coolGray-100 flex w-full items-center rounded-[12px] border border-solid border-transparent px-6 py-4 outline-none focus:outline-none',
              signupErrors?.nickname ? 'focus:border-error-red' : 'focus:border-primary-100',
            )}
          />
          {signupErrors?.nickname && (
            <p className="text-error-red text-sm leading-[24px] font-semibold">
              {signupErrors.nickname.message}
            </p>
          )}
        </div>
      )}
      <div className="flex flex-col gap-4">
        <label className="text-secondary-800 text-lg leading-[26px] font-bold">비밀번호</label>
        <div className="relative">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요."
            {...register('password')}
            className={clsx(
              'bg-coolGray-100 flex w-full items-center rounded-[12px] border border-solid border-transparent px-6 py-4 pr-14 outline-none focus:outline-none',
              errors.password ? 'focus:border-error-red' : 'focus:border-primary-100',
            )}
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute top-1/2 right-4 -translate-y-1/2"
          >
            <Image
              src={isPasswordVisible ? '/icons/ic_eye_on.svg' : '/icons/ic_eye_off.svg'}
              alt="ic_eye"
              width={24}
              height={24}
            />
          </button>
        </div>
        {errors.password && (
          <p className="text-error-red text-sm leading-[24px] font-semibold">
            {errors.password.message}
          </p>
        )}
      </div>
      {type === 'signup' && (
        <div className="flex flex-col gap-4">
          <label className="text-secondary-800 text-lg leading-[26px] font-bold">
            비밀번호 확인
          </label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...register('confirmPassword')}
            className={clsx(
              'bg-coolGray-100 flex w-full items-center rounded-[12px] border border-solid border-transparent px-6 py-4 pr-14 outline-none focus:outline-none',
              signupErrors?.confirmPassword ? 'focus:border-error-red' : 'focus:border-primary-100',
            )}
          />
          {signupErrors?.confirmPassword && (
            <p className="text-error-red text-sm leading-[24px] font-semibold">
              {signupErrors.confirmPassword.message}
            </p>
          )}
        </div>
      )}
      <Button
        type={type === 'login' ? 'login' : 'signup'}
        size="lg"
        disabled={isSubmitting || !isValid}
      />
    </form>
  );
};

export default AuthForm;
