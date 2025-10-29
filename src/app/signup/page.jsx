"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import InputField from "@/components/InputField/InputField";
import AuthButton from "@/components/AuthPage/AuthButton";
import SocialLogin from "@/components/AuthPage/SocialLogin";
import Modal from "@/components/AuthPage/Modal";
import { authService } from "@/api/auth";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/items");
    }
  }, [router]);

  const signupMutation = useMutation({
    mutationFn: ({ nickname, email, password, passwordConfirmation }) =>
      authService.signUp(nickname, email, password, passwordConfirmation),
    onSuccess: () => router.push("/login"),
    onError: (err) => {
      setModalMessage(
        err.message || "회원가입 실패. 이메일 또는 비밀번호를 확인해주세요."
      );
      setIsModalOpen(true);
    },
  });

  const handleSignup = () => {
    if (!email || !nickname || !password || !confirm) {
      setError("모든 필드를 입력해주세요.");
      return;
    }
    if (password !== confirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    signupMutation.mutate({
      nickname,
      email,
      password,
      passwordConfirmation: confirm,
    });
  };

  const isDisabled = !email || !nickname || !password || !confirm;

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-15">
      <article className="flex w-full max-w-lg flex-col items-center gap-10">
        <Link href="/" className="logo">
          <Image src="/logo_md.svg" alt="판다 얼굴" width={396} height={132} />
        </Link>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full flex-col gap-6"
        >
          <InputField
            title="이메일"
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            title="닉네임"
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <InputField
            title="비밀번호"
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputField
            title="비밀번호 확인"
            type="password"
            id="confirm"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          {error && (
            <p className="text-sm font-semibold text-red-500">{error}</p>
          )}

          <div>
            <AuthButton
              text="회원가입"
              onClick={handleSignup}
              disabled={isDisabled}
            />
          </div>
        </form>

        <SocialLogin />

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <p>이미 회원이신가요?</p>
          <Link href="/login" className="text-blue-500 underline">
            로그인
          </Link>
        </div>
      </article>

      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};

export default SignupPage;
