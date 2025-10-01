"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/api";
import Modal from "@/components/Modal.jsx";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });

  const [showPw, setShowPw] = useState(false);
  const [failMsg, setFailMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // 접근 가드: 토큰 있으면 /items로
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) router.replace("/items");
  }, [router]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await signIn({ email: values.email.trim(), password: values.password });
      const token = res?.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
        router.replace("/items");
      } else {
        throw new Error("토큰이 응답에 없습니다.");
      }
    } catch (err) {
      // 인풋 하단 에러 문구 요구사항
      setError("email", { type: "server", message: "이메일을 확인해 주세요." });
      setError("password", { type: "server", message: "비밀번호를 확인해 주세요." });

      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "로그인에 실패했어요. 잠시 후 다시 시도해 주세요.";
      setFailMsg(msg);
      setModalOpen(true);
    }
  });

  return (
    <main className="flex justify-center items-start">
      <div className="w-full max-w-[640px] pt-10 pb-36 px-4">
        <Link href="/" aria-label="판다마켓 홈" className="mb-10 block">
          <img src="/images/logo/panda-logo.svg" alt="판다마켓 로고" className="h-[130px] w-auto mx-auto" />
        </Link>

        <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
          {/* 이메일 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[18px] font-bold">이메일</label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              autoComplete="email"
              {...register("email", {
                required: "이메일을 확인해 주세요.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일을 확인해 주세요.",
                },
              })}
              className="h-[52px] rounded-lg bg-gray-100 px-4 text-[16px] focus:outline-2 focus:outline-[#3692ff]"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[18px] font-bold">비밀번호</label>
            <div className="relative h-[56px]">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                autoComplete="current-password"
                {...register("password", {
                  required: "비밀번호를 확인해 주세요.",
                  minLength: { value: 1, message: "비밀번호를 확인해 주세요." },
                })}
                className="h-full w-full rounded-lg bg-gray-100 px-4 text-[16px] focus:outline-2 focus:outline-[#3692ff]"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
              >
                <img
                  src={showPw ? "/images/home/eye.svg" : "/images/home/eye-off.svg"}
                  alt=""
                  width="24"
                  height="24"
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* 버튼: 클릭/Enter 모두 제출됨 */}
          <button
            id="loginBtn"
            type="submit"
            disabled={!isValid || isSubmitting}
            className="rounded-full bg-[#3692ff] text-white text-[20px] font-semibold py-4 disabled:opacity-50"
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {/* 소셜 */}
        <section aria-label="간편 로그인" className="mt-6 w-full rounded-lg bg-gray-50 px-6 py-4 flex items-center justify-between">
          <span className="text-[16px] text-gray-600 font-medium leading-6">간편 로그인하기</span>
          <div className="flex gap-3">
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" aria-label="구글로 이동">
              <img src="/images/home/google.svg" alt="구글" />
            </a>
            <a href="https://www.kakaocorp.com/page" target="_blank" rel="noopener noreferrer" aria-label="카카오로 이동">
              <img src="/images/home/kakao.svg" alt="카카오" />
            </a>
          </div>
        </section>

        {/* 회원가입 링크 문구 요구사항: '회원 가입하기' */}
        <div className="mt-6 flex justify-center items-center gap-1 text-[14px] text-gray-600 font-medium">
          <span>판다마켓이 처음이신가요?</span>
          <Link href="/signup" className="text-[#3692ff] underline font-semibold">회원 가입하기</Link>
        </div>
      </div>

      <Modal
        open={modalOpen}
        message={failMsg}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
