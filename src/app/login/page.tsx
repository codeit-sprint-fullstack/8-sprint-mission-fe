"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import InputField from "@/components/InputField/InputField";
import AuthButton from "@/components/AuthPage/AuthButton";
import SocialLogin from "@/components/AuthPage/SocialLogin";
import Modal from "@/components/AuthPage/Modal";
import { authService } from "@/api/auth";
import { useAuth } from "@/providers/AuthProvider";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const router = useRouter();

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const userData = await login(email, password);

      if (userData) {
        router.push("/items");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "로그인 실패. 이메일 또는 비밀번호를 확인해주세요.";
      setModalMessage(message);
      setIsModalOpen(true);
    }
  };

  const isDisabled = !email || !password;

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
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
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            title="비밀번호"
            type="password"
            placeholder="비밀번호을 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm font-semibold text-red-500">{error}</p>
          )}

          <div>
            <AuthButton
              text="로그인"
              onClick={handleLogin}
              disabled={isDisabled}
            />
          </div>
        </form>

        <SocialLogin />

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <p>판다마켓이 처음이신가요?</p>
          <Link href="/signup" className="text-blue-500 underline">
            회원가입
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

export default LoginPage;
