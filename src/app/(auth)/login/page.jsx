"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { validateEmail, validatePassword } from "@/app/(auth)/(lib)/util.js"; //  유효성 검사
import Modal from "@/components/Modal";
import { signIn } from "@/app/(auth)/(lib)/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  // 토큰 있으면 접근 시 바로 /items
  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    if (token) router.replace("/items");
  }, [router]);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  // utils.js을 react-hook-form에 연결
  const emailValidate = useMemo(
    () => (v) => validateEmail(String(v ?? "").trim()) || true,
    []
  );
  const passwordValidate = useMemo(
    () => (v) => validatePassword(String(v ?? "").trim()) || true,
    []
  );

  // 로그인 요청
  const loginMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      const token = data?.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
        router.replace("/items"); // .replace는 브라우저 히스토리에 기존 페이지 기록을 남기지 않음 -> 뒤로가기 X -> 로그인 후 다시 로그인 페이지를 가지 않도록 방지/.push는  브라우저 히스토리에 기록이 남음 -> 뒤로가기 O -> push 사용시 로그인하고 로그인 창을 뒤로가기 하는 불 필요한 동작
      } else {
        setModalMsg("응답에 accessToken이 없습니다.");
        setModalOpen(true);
      }
    },
    onError: (error) => {
      setError("email", { type: "server", message: "이메일을 확인해 주세요." });
      setError("password", {
        type: "server",
        message: "비밀번호를 확인해 주세요.",
      });
      setModalMsg(error?.message || "로그인에 실패했습니다.");
      setModalOpen(true);
    },
  });

  const onSubmit = (values) => {
    clearErrors();
    loginMutation.mutate(values);
  };

  return (
    <main className="min-h-screen grid place-items-center px-4 py-10 tablet:px-8 pc:px-0">
      <section
        className="
    mx-auto rounded-2xl bg-white
    mobile:w-[375px] tablet:w-[640px] pc:w-[640px]
    mobile:p-5 tablet:p-8 pc:p-8
  "
      >
        <div className="mb-10 flex flex-col items-center">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="홈으로"
          >
            <Image
              src="/login_pand_face.png"
              alt="로그인 판다"
              width={104}
              height={104}
              className="
    object-contain shrink-0       
    w-[104px] h-[104px]   
    mobile:w-[52px]  mobile:h-[52px]  
    tablet:w-[104px]  tablet:h-[104px]           
    pc:w-[104px] pc:h-[104px] 
  "
            />
            <span
              className="
    font-rokaf font-bold text-brand-blue leading-none
    text-[36px]          
    tablet:text-[66px]   
    pc:text-[66px]       
  "
            >
              판다마켓
            </span>
          </Link>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="email"
              className="text-[var(--Secondary-800,#1F2937)] font-pretendard text-[18px] font-bold leading-[26px]"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              className="h-[56px] w-full rounded-[12px] bg-[var(--Cool-Gray-100,#F3F4F6)] px-6 py-4"
              {...register("email", {
                validate: emailValidate,
              })}
            />
            {errors.email?.message && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="password"
              className="text-[var(--Secondary-800,#1F2937)] font-pretendard text-[18px] font-bold leading-[26px]"
            >
              비밀번호
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                className="h-[56px] w-full rounded-[12px] bg-[var(--Cool-Gray-100,#F3F4F6)] px-6 py-4"
                {...register("password", {
                  validate: passwordValidate,
                })}
              />
              <button
                type="button"
                aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보이기"}
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Image
                  src={
                    showPw ? "/ic_visibility_on.svg" : "/ic_visibility_off.svg"
                  }
                  alt={showPw ? "비밀번호 보이는 중" : "비밀번호 가려진 상태"}
                  width={24}
                  height={24}
                />
              </button>
            </div>
            {errors.password?.message && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={[
              "flex w-full items-center justify-center gap-[10px] rounded-[40px] px-[124px] py-[16px] font-medium",
              !isValid || isSubmitting
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-blue-500 text-white hover:opacity-90 active:opacity-80",
            ].join(" ")}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <section className="mt-8 rounded-lg bg-[#E6F2FF] p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[var(--Secondary-800,#1F2937)] font-pretendard text-base font-medium leading-[26px]">
              간편 로그인하기
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="https://www.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 "
                aria-label="Google로 로그인"
              >
                <Image
                  src="/ic_google.png"
                  alt="Google"
                  width={42}
                  height={42}
                />
              </a>
              <a
                href="https://www.kakaocorp.com/page"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2"
                aria-label="Kakao로 로그인"
              >
                <Image src="/ic_kakao.png" alt="Kakao" width={42} height={42} />
              </a>
            </div>
          </div>
        </section>

        <div className="mt-6 flex items-center justify-center text-sm gap-1">
          <span className="text-gray-800">판다마켓이 처음이신가요?</span>
          <Link href="/signup" className="font-medium text-blue-500 underline">
            회원가입
          </Link>
        </div>
      </section>

      <Modal
        open={modalOpen}
        message={modalMsg}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
