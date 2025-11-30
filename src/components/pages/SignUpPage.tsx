"use client";

//라이브러리
import { useState } from "react";
import useAuth from "@/store/useAuth";
import { useAuthInput } from "@/hooks/useAuthInput";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

//컴포넌트
import Input from "../mocules/Input";
import Button from "../atoms/Button";

//이미지
import googleIcon from "@/images/google-logo.png";
import kakaoIcon from "@/images/kakao-logo.png";
import logo from "@/images/logo.svg";
import Modal from "../mocules/Modal";

export default function SignupPage() {
  const { values, errors, isSignUpSubmitActive, onChange } = useAuthInput();
  const { signup } = useAuth();
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = values;
    const result = await signup(name, email, password);
    if (!result.ok) {
      console.log(result);
      setModalMessage(result.message);
      setIsModalOpen(true);
      return;
    }

    console.log(result);
    //성공하면 중고마켓 페이지 이동
    if (result.ok) {
      router.push(`/items`);
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
          label="닉네임"
          name="name"
          value={values.name}
          error={errors.name}
          onChange={onChange}
          placeholder="닉네임을 입력해주세요."
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
        <Input
          type="password"
          label="비밀번호 확인"
          name="passwordCheck"
          value={values.passwordCheck}
          error={errors.passwordCheck}
          onChange={onChange}
          placeholder="비밀번호를 다시 한번 입력해주세요."
        />
        <Button
          className="w-full rounded-full px-[33.5px] py-[14.5px] text-[16px] font-semibold"
          disabled={!isSignUpSubmitActive}
        >
          회원가입
        </Button>
      </form>

      <div className="my-[24px] flex items-center justify-between rounded-[8px] bg-[#e6f2ff] px-[23px] py-[16px]">
        <h3>간편 로그인하기</h3>
        <div className="flex gap-[8px] text-[16px] font-medium">
          <Link href="https://www.google.com/">
            <Image
              src={googleIcon}
              alt="구글 로그인"
              className="h-[42px] w-[42px]"
            />
          </Link>
          <Link href="https://www.kakaocorp.com/page/">
            <Image
              src={kakaoIcon}
              alt="카카오 로그인"
              className="h-[42px] w-[42px]"
            />
          </Link>
        </div>
      </div>

      <div className="flex justify-center gap-[4px] text-center text-[15px] font-medium">
        이미 회원이신가요?
        <Link
          className="text-[#3182f6] underline underline-offset-[2px]"
          href="/login"
        >
          로그인
        </Link>
      </div>

      <Modal
        message={modalMessage}
        isOpen={isModalOpen}
        onClick={() => setIsModalOpen(false)}
      />
    </main>
  );
}
