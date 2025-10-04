'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SocialLogin from '@/components/auth/SocialLogin';
import { useSignInMutation } from '@/hooks/useAuthMutations';
import { getAccessToken } from '@/lib/authStorage';
import { useAuth } from '@/providers/AuthProvider';
import Toast from '@/components/Toast';
import AuthInput from '@/components/auth/AuthInput';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState('');
  const { mutateAsync: signIn, isPending } = useSignInMutation();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const token = getAccessToken();
    if (token) router.replace('/items');
  }, [router]);

  const validateEmail = (value) => {
    if (!value) return '이메일을 입력해 주세요';
    const ok = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(value);
    return ok ? '' : '올바른 이메일 형식이 아니에요';
  };

  const validatePassword = (value) => {
    if (!value) return '비밀번호를 입력해 주세요';
    if (value.length < 8) return '비밀번호는 8자 이상이어야 해요';
    return '';
  };

  const handleEmailChange = (e) => {
    const v = e.target.value;
    setEmail(v);
    setErrors((p) => ({ ...p, email: validateEmail(v) }));
  };

  const handlePasswordChange = (e) => {
    const v = e.target.value;
    setPassword(v);
    setErrors((p) => ({ ...p, password: validatePassword(v) }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const pwErr = validatePassword(password);
    setErrors({ email: emailErr, password: pwErr });
    if (emailErr || pwErr) return;

    try {
      await signIn({ email, password });
      // 로그인 직후 헤더 반영
      refreshUser?.();
      router.push('/');
    } catch (e) {
      console.error('로그인 실패', e);
      // setAlert(e.message || '로그인에 실패했어요');
      // 명확한 에러원인을 알수없게
      setAlert('이메일 또는 비밀번호가 올바르지 않아요');
    }
  };

  const isValid = email && password && !errors.email && !errors.password;

  return (
    <div className="space-y-8">
      <Toast open={alert} message={alert} onClose={() => setAlert('')} type="error" />

      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <AuthInput
          id="email"
          label="이메일"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일을 입력해 주세요"
          error={errors.email}
        />
        <AuthInput
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력해 주세요"
          error={errors.password}
          withToggle
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
