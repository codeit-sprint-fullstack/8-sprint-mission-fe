'use client';

//라이브러리
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth, useAuthInput } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

//컴포넌트
import InputForm from '@/components/molecules/InputForm/InputForm';
import Button from '@/components/Atoms/Button';

//스타일
import styles from './signup.module.css';

//이미지
import googleIcon from '../../../public/images/social/google-logo.png';
import kakaoIcon from '../../../public/images/social/kakao-logo.png';
import logo from '../../../public/images/logo/logo.svg';
import Modal from '@/components/molecules/Modal/Modal';

export default function Login() {
  const { values, errors, isSignUpSubmitActive, onChange } = useAuthInput();
  const { signUp } = useAuth();
  const [modalMessage, setModalMessage] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email: values.email,
      password: values.password,
      passwordCheck: values.passwordCheck,
      nickName: '가입한 판다',
    };

    const res = await signUp(body);
    if (typeof res === 'string') {
      console.log(res);
      setModalMessage(res);
      setIsModalOpen(true);
      return;
    }

    //성공하면 중고마켓 페이지 이동
    if (res) {
      router.push(`/items`);
    }
  };

  return (
    <main className={styles.authContainer}>
      <div className={styles.logoDiv}>
        <Link href="/" className={styles.logoHomeLink}>
          <Image src={logo} alt="판다마켓 로고" className={styles.logoImg} />
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.authForm}>
        <InputForm
          label="이메일"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={values.email}
          onChange={onChange}
          validErrorMsg={errors.email}
          focusBorder={true}
        />
        <InputForm
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={values.password}
          onChange={onChange}
          validErrorMsg={errors.password}
          focusBorder={true}
        />
        <InputForm
          label="비밀번호 확인"
          name="passwordCheck"
          placeholder="비밀번호를 다시 한번 입력해주세요."
          value={values.passwordCheck}
          onChange={onChange}
          validErrorMsg={errors.passwordCheck}
          focusBorder={true}
        />
        <Button className={styles.subimtButton} disabled={!isSignUpSubmitActive}>
          로그인
        </Button>
      </form>

      <div className={styles.socialLoginContainer}>
        <h3>간편 로그인하기</h3>
        <div className={styles.socialLoginLinksContainer}>
          <Link href="https://www.google.com/">
            <Image src={googleIcon} alt="구글 로그인" className={styles.socialIcon} />
          </Link>
          <Link href="https://www.kakaocorp.com/page/">
            <Image src={kakaoIcon} alt="카카오 로그인" className={styles.socialIcon} />
          </Link>
        </div>
      </div>

      <div className={styles.authSwitch}>
        이미 회원이신가요?
        <Link href="/login">로그인</Link>
      </div>

      <Modal message={modalMessage} isOpen={isModalOpen} onClick={() => setIsModalOpen(false)} />
    </main>
  );
}
