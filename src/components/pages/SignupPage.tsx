'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SocialLogin from '@/components/auth/SocialLogin';
import { useSignUpMutation } from '@/hooks/useAuthMutations';
import { getRefreshToken } from '@/lib/authStorage';
import Toast from '@/components/Toast';
import AuthInput from '@/components/auth/AuthInput';
import { signupSchema, type SignupFormData } from '@/types/validationSchemas';

export default function SignupPage() {
  const router = useRouter();
  const [alert, setAlert] = useState<string>('');
  const [alertType, setAlertType] = useState<'error' | 'success'>('error');
  const { mutateAsync: signUp, isPending } = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
  });

  useEffect(() => {
    // refreshToken이 있으면 이미 로그인 상태
    const token = getRefreshToken();
    if (token) router.replace('/items');
  }, [router]);

  const onSubmit = async (data: SignupFormData) => {
    try {
      // 백엔드는 passwordConfirmation을 사용하지 않음
      await signUp({ email: data.email, nickname: data.nickname, password: data.password });
      // 회원가입 성공 시 로그인 페이지로 이동
      setAlertType('success');
      setAlert('회원가입이 완료되었어요! 로그인해 주세요.');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (e: unknown) {
      console.error('회원가입 실패', e);
      setAlertType('error');
      const error = e as { message?: string };
      if (error.message?.includes('Email already exists')) {
        setAlert('이미 사용 중인 이메일이에요');
      } else {
        setAlert(error.message || '회원가입에 실패했어요');
      }
    }
  };

  return (
    <div className="space-y-8">
      <Toast open={!!alert} message={alert} onClose={() => setAlert('')} type={alertType} />

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해 주세요"
          error={errors.email?.message}
          {...register('email')}
        />
        <AuthInput
          id="nickname"
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          error={errors.nickname?.message}
          {...register('nickname')}
        />
        <AuthInput
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          error={errors.password?.message}
          withToggle
          {...register('password')}
        />
        <AuthInput
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          error={errors.passwordConfirm?.message}
          withToggle
          {...register('passwordConfirm')}
        />
        <button
          type="submit"
          disabled={!isValid || isPending}
          className={`h-14 rounded-full text-white text-lg ${isValid ? 'bg-primary opacity-100' : 'bg-[var(--gray-400)] opacity-70'} ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isPending ? '가입 중…' : '회원가입'}
        </button>

        <SocialLogin />

        <div className="text-center text-sm font-medium">
          이미 회원이신가요?
          <Link href="/login" className="ml-1 text-primary underline">
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
}
