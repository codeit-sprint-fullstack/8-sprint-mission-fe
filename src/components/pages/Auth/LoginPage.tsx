'use client';

//라이브러리
import { useState } from 'react';
import useAuth from '@/store/useAuth';
import { useAuthInput } from '@/hooks/useAuthInput';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

//컴포넌트
import Input from '../../mocules/Input';
import Button from '../../atoms/Button';

//이미지
import googleIcon from '@/images/google-logo.png';
import kakaoIcon from '@/images/kakao-logo.png';
import logo from '@/images/logo.svg';
import Modal from '../../mocules/Modal';
import { errorHandler } from '@/utils/errorHandler';

export default function LoginPage() {
  const { values, errors, isLogInSubmitActive, onChange } = useAuthInput();
  const { login } = useAuth();
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = values;
    const result = await login(email, password).catch(errorHandler);
    if ('message' in result) {
      console.log(result);
      setModalMessage(result.message);
      setIsModalOpen(true);
      return;
    } else {
      console.log(result);
      router.push('/items');
    }
  };

  return (
    <main className="relative mx-auto w-full max-w-[432px] bg-white px-[16px] py-[24px]">
      <div className="mb-[24px] flex justify-center">
        <Link href="/" className="block">
          <Image src={logo} alt="판다마켓 로고" className="w-[198px]" />
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full flex-col">
        <Input
          label="이메일"
          name="email"
          value={values.email}
          error={errors.email}
          onChange={onChange}
          placeholder="이메일을 입력해주세요."
        />
        <Input
          type="password"
          label="비밀번호"
          name="password"
          value={values.password}
          error={errors.password}
          onChange={onChange}
          placeholder="비밀번호를 입력해주세요."
        />
        <Button
          className="w-full rounded-full px-[33.5px] py-[14.5px] text-[16px] font-semibold"
          disabled={!isLogInSubmitActive}
        >
          로그인
        </Button>
      </form>

      <div className="my-[24px] flex items-center justify-between rounded-[8px] bg-[#e6f2ff] px-[23px] py-[16px]">
        <h3>간편 로그인하기</h3>
        <div className="flex gap-[8px] text-[16px] font-medium">
          <Link href="https://www.google.com/">
            <Image src={googleIcon} alt="구글 로그인" className="h-[42px] w-[42px]" />
          </Link>
          <Link href="https://www.kakaocorp.com/page/">
            <Image src={kakaoIcon} alt="카카오 로그인" className="h-[42px] w-[42px]" />
          </Link>
        </div>
      </div>

      <div className="flex justify-center gap-[4px] text-center text-[15px] font-medium">
        판다마켓이 처음이신가요?
        <Link className="text-[#3182f6] underline underline-offset-[2px]" href="/signup">
          회원가입
        </Link>
      </div>

      <Modal message={modalMessage} isOpen={isModalOpen} onClick={() => setIsModalOpen(false)} />
    </main>
  );
}
