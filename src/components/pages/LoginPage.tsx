'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SocialLogin from '@/components/auth/SocialLogin';
import { useSignInMutation } from '@/hooks/useAuthMutations';
import { getRefreshToken } from '@/lib/authStorage';
import { useAuth } from '@/providers/AuthProvider';
import Toast from '@/components/Toast';
import AuthInput from '@/components/auth/AuthInput';
import { loginSchema, type LoginFormData } from '@/types/validationSchemas';

export default function LoginPage() {
  const router = useRouter();
  const [alert, setAlert] = useState<string>('');
  const { mutateAsync: signIn, isPending } = useSignInMutation();
  const { setAuthUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    // refreshToken이 있으면 이미 로그인 상태
    const token = getRefreshToken();
    if (token) router.replace('/items');
  }, [router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn({ email: data.email, password: data.password });
      // 로그인 성공: user 정보 저장
      if (result?.user) {
        setAuthUser(result.user);
      }
      router.push('/');
    } catch (e) {
      console.error('로그인 실패', e);
      // 명확한 에러원인을 알 수 없게
      setAlert('이메일 또는 비밀번호가 올바르지 않아요');
    }
  };

  return (
    <div className="space-y-8">
      <Toast open={!!alert} message={alert} onClose={() => setAlert('')} type="error" />

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
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          error={errors.password?.message}
          withToggle
          {...register('password')}
        />
        <button
          type="submit"
          disabled={!isValid || isPending}
          className={`h-14 rounded-full text-white text-lg ${isValid ? 'bg-primary opacity-100' : 'bg-[var(--gray-400)] opacity-70'} ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isPending ? '로그인 중…' : '로그인'}
        </button>

        <SocialLogin />

        <div className="text-center text-sm font-medium">
          판다마켓이 처음이신가요?
          <Link href="/signup" className="ml-1 text-primary underline">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
