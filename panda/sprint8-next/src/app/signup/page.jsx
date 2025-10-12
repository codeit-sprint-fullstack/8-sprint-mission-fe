"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/api";
import Modal from "@/components/Modal.jsx";

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });

  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [failMsg, setFailMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const pw = watch("password");
  const pw2 = watch("passwordConfirm");


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) router.replace("/items");
  }, [router]);

  const onSubmit = handleSubmit(async (values) => {
    if (values.password !== values.passwordConfirm) {
      setError("passwordConfirm", { type: "mismatch", message: "비밀번호가 일치하지 않아요." });
      return;
    }
    try {
      const res = await signUp({
        email: values.email.trim(),
        nickname: values.nickname.trim(),
        password: values.password,
        passwordConfirmation: values.passwordConfirm,
      });
      const token = res?.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
        router.replace("/items");
      } else {
        throw new Error("토큰이 응답에 없습니다.");
      }
    } catch (err) {
      const payload = {
        status: err?.response?.status,
        meessage: err?.response?.data?.message || err?.message,
        details: err?.response?.data?.details,
      };
      if (!errors.email) setError("email", { message: "이메일을 확인해 주세요." });
      if (!errors.password) setError("password", { message: "비밀번호를 확인해 주세요." });
      if (watch("password") !== watch("passwordConfirm")) {
        setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다." });
      }
      setFailMsg(
        payload?.details
          ? `${payload.message}\n${JSON.stringify(payload.errors, null, 2)}`
          : payload.message || "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요."
      );
      setModalOpen(true);
    }
  });

  return (
    <main className="flex justify-center items-start">
      <div className="w-full max-w-[640px] pt-10 pb-28 px-4">
        <Link href="/" aria-label="판다마켓 홈" className="mb-10 block">
          <img src="/images/logo/panda-logo.svg" alt="판다마켓 로고" className="h-[130px] w-auto mx-auto" />
        </Link>

        <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
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
              className="h-14 rounded-xl bg-white px-4 text-[16px] shadow-[inset_0_0_0_1px_#e5e7eb] focus:outline-2 focus:outline-[#3692ff]"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

         
          <div className="flex flex-col gap-2">
            <label htmlFor="nickname" className="text-[18px] font-bold">닉네임</label>
            <input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요"
              autoComplete="nickname"
              {...register("nickname", { required: "닉네임을 입력해 주세요.", minLength: { value: 2, message: "닉네임을 확인해 주세요." }, maxLength: { value: 12, message: "닉네임을 확인해 주세요." } })}
              className="h-14 rounded-xl bg-white px-4 text-[16px] shadow-[inset_0_0_0_1px_#e5e7eb] focus:outline-2 focus:outline-[#3692ff]"
            />
            {errors.nickname && <p className="text-sm text-red-600">{errors.nickname.message}</p>}
          </div>

      
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[18px] font-bold">비밀번호</label>
            <div className="relative h-14">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                autoComplete="new-password"
                {...register("password", { required: "비밀번호를 확인해 주세요.", minLength: { value: 8, message: "비밀번호를 확인해 주세요." } })}
                className="h-full w-full rounded-lg bg-white px-4 text-[16px] shadow-[inset_0_0_0_1px_#e5e7eb] focus:outline-2 focus:outline-[#3692ff]"
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
            <small className="text-gray-500">8자 이상 입력해주세요.</small>
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>

         
          <div className="flex flex-col gap-2">
            <label htmlFor="passwordConfirm" className="text-[18px] font-bold">비밀번호 확인</label>
            <div className="relative h-14">
              <input
                id="passwordConfirm"
                type={showPw2 ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                autoComplete="new-password"
                {...register("passwordConfirm", {
                  required: "비밀번호가 일치하지 않아요.", 
                  validate: (v) => v === pw || "비밀번호가 일치하지 않아요.",
                })}
                className="h-full w-full rounded-lg bg-white px-4 text-[16px] shadow-[inset_0_0_0_1px_#e5e7eb] focus:outline-2 focus:outline-[#3692ff]"
              />
              <button
                type="button"
                onClick={() => setShowPw2((v) => !v)}
                aria-label={showPw2 ? "비밀번호 숨기기" : "비밀번호 보기"}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
              >
                <img
                  src={showPw2 ? "/images/home/eye.svg" : "/images/home/eye-off.svg"}
                  alt=""
                  width="24"
                  height="24"
                />
              </button>
            </div>
            {errors.passwordConfirm && (
              <p className="text-sm text-red-600">{errors.passwordConfirm.message}</p>
            )}
          </div>

          <button
            id="signupBtn"
            type="submit"
            disabled={!isValid || isSubmitting}
            className="rounded-full bg-[#3692ff] text-white text-[20px] font-semibold py-4 disabled:opacity-50"
          >
            {isSubmitting ? "가입 중..." : "회원가입"}
          </button>
        </form>

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

        <div className="mt-6 flex justify-center items-center gap-1 text-[14px] text-gray-600 font-medium">
          <span>이미 회원이신가요?</span>
          <Link href="/login" className="text-[#3692ff] underline font-semibold">로그인</Link>
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
