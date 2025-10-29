'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SocialLogin from '@/components/auth/SocialLogin';
import { useSignUpMutation } from '@/hooks/useAuthMutations';
import { getRefreshToken } from '@/lib/authStorage';
import { useAuth } from '@/providers/AuthProvider';
import Toast from '@/components/Toast';
import AuthInput from '@/components/auth/AuthInput';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({ email: '', name: '', password: '', passwordConfirm: '' });
  const [alert, setAlert] = useState('');
  const [alertType, setAlertType] = useState('error'); // Toast 타입 추가
  const { mutateAsync: signUp, isPending } = useSignUpMutation();
  const { setAuthUser } = useAuth();

  useEffect(() => {
    // refreshToken이 있으면 이미 로그인 상태
    const token = getRefreshToken();
    if (token) router.replace('/items');
  }, [router]);

  const validateEmail = (value) => {
    if (!value) return '이메일을 입력해 주세요';
    const ok = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(value);
    return ok ? '' : '올바른 이메일 형식이 아니에요';
  };
  const validateName = (value) => {
    if (!value) return '닉네임을 입력해 주세요';
    if (value.length < 2) return '닉네임은 2자 이상이어야 해요';
    return '';
  };
  const validatePassword = (value) => {
    if (!value) return '비밀번호를 입력해 주세요';
    if (value.length < 8) return '비밀번호는 8자 이상이어야 해요';
    return '';
  };
  const validatePasswordConfirm = (pw, pwc) => {
    if (!pwc) return '비밀번호를 다시 입력해 주세요';
    if (pw !== pwc) return '비밀번호가 일치하지 않아요';
    return '';
  };

  const handleEmailChange = (e) => {
    const v = e.target.value;
    setEmail(v);
    setErrors((p) => ({ ...p, email: validateEmail(v) }));
  };
  const handleNameChange = (e) => {
    const v = e.target.value;
    setName(v);
    setErrors((p) => ({ ...p, name: validateName(v) }));
  };
  const handlePasswordChange = (e) => {
    const v = e.target.value;
    setPassword(v);
    setErrors((p) => ({
      ...p,
      password: validatePassword(v),
      passwordConfirm: validatePasswordConfirm(v, passwordConfirm),
    }));
  };
  const handlePasswordConfirmChange = (e) => {
    const v = e.target.value;
    setPasswordConfirm(v);
    setErrors((p) => ({ ...p, passwordConfirm: validatePasswordConfirm(password, v) }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const nameErr = validateName(name);
    const pwErr = validatePassword(password);
    const pwcErr = validatePasswordConfirm(password, passwordConfirm);
    setErrors({ email: emailErr, name: nameErr, password: pwErr, passwordConfirm: pwcErr });
    if (emailErr || nameErr || pwErr || pwcErr) return;

    try {
      // 백엔드는 passwordConfirmation을 사용하지 않음
      const result = await signUp({ email, nickname: name, password });
      // 회원가입 성공 시 로그인 페이지로 이동
      setAlertType('success');
      setAlert('회원가입이 완료되었어요! 로그인해 주세요.');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (e) {
      console.error('회원가입 실패', e);
      setAlertType('error');
      if (e.message?.includes('Email already exists')) {
        setAlert('이미 사용 중인 이메일이에요');
      } else {
        setAlert(e.message || '회원가입에 실패했어요');
      }
    }
  };

  const isValid =
    email &&
    name &&
    password &&
    passwordConfirm &&
    !errors.email &&
    !errors.name &&
    !errors.password &&
    !errors.passwordConfirm;

  return (
    <div className="space-y-8">
      <Toast open={!!alert} message={alert} onClose={() => setAlert('')} type={alertType} />

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
          id="name"
          label="닉네임"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="닉네임을 입력해 주세요"
          error={errors.name}
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
        <AuthInput
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          error={errors.passwordConfirm}
          withToggle
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
