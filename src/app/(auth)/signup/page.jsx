"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { validateEmail, validatePassword } from "@/app/(auth)/(lib)/util.js"; //  유효성 검사
import Modal from "@/components/Modal";
import { signUp } from "@/app/(auth)/(lib)/api/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [postAuthNext, setPostAuthNext] = useState(null); // 모달을 닫은 뒤 이동할 경로를 임시 저장
  // 모달창이 안열려있고 토큰 있으면 바로 /items
  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    if (token && !modalOpen && !postAuthNext) {
      router.replace("/items"); // 뒤로가기 방지
    }
  }, [router, modalOpen, postAuthNext]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
    },
  });

  // react-hook-form
  const emailValidate = useMemo(
    () => (v) => validateEmail(String(v ?? "").trim()) || true,
    []
  );
  const passwordValidate = useMemo(
    () => (v) => validatePassword(String(v ?? "").trim()) || true,
    []
  );
  const passwordConfirmValidate = useMemo(
    () => (v) => {
      const { password } = getValues();
      if (String(v ?? "") !== String(password ?? "")) {
        return "비밀번호가 일치하지 않아요.";
      }
      return true;
    },
    [getValues]
  );

  // 회원가입 요청
  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      const token = data?.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
        setModalMsg("가입 완료되었습니다.");
        setModalOpen(true);
        setPostAuthNext("/items");
      } else {
        setModalMsg("응답에 accessToken이 없습니다.");
        setModalOpen(true);
      }
    },
    onError: (error) => {
      setModalMsg(error?.message || "로그인에 실패했습니다.");
      setModalOpen(true);
      const fe = error?.fieldErrors;

      if (fe?.email) {
        const msg = Array.isArray(fe.email) ? fe.email[0] : String(fe.email);
        setError("email", {
          type: "server",
          message: msg || "이메일을 확인해 주세요.",
        });
      }
      if (fe?.nickname) {
        const msg = Array.isArray(fe.nickname)
          ? fe.nickname[0]
          : String(fe.nickname);
        setError("nickname", {
          type: "server",
          message: msg || "닉네임을 확인해 주세요.",
        });
      }
      if (fe?.password) {
        const msg = Array.isArray(fe.password)
          ? fe.password[0]
          : String(fe.password);
        setError("password", {
          type: "server",
          message: msg || "비밀번호를 확인해 주세요.",
        });
      }

      // 상태코드에 따른 대표 메시지(중복 이메일 등)
      if (error?.status === 409) {
        setError("email", {
          type: "server",
          message: "이미 가입된 이메일입니다.",
        });
      } else if (error?.status === 400) {
        // 서버가 Validation Failed를 줬다면
        if (!fe) {
          setError("email", {
            type: "server",
            message: "이메일을 확인해 주세요.",
          });
          setError("password", {
            type: "server",
            message: "비밀번호를 확인해 주세요.",
          });
        }
      }

      setModalMsg(error?.message || "회원가입에 실패했습니다.");
      setModalOpen(true);
    },
  });

  const onSubmit = (values) => {
    clearErrors();
    const { email, password, nickname, passwordConfirm } = values;
    signUpMutation.mutate({ email, password, nickname, passwordConfirm });
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
        {/* 상단 로고 영역 */}
        <div className="mb-10 flex flex-col items-center">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="홈으로"
          >
            <Image
              src="/login_pand_face.png"
              alt="회원가입 판다"
              width={104}
              height={104}
              className="
                object-contain shrink-0
                w-[104px] h-[104px]
                mobile:w-[52px] mobile:h-[52px]
                tablet:w-[104px] tablet:h-[104px]
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

        {/* 폼 */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* 이메일 */}
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
              {...register("email", { validate: emailValidate })}
            />
            {errors.email?.message && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          {/* 닉네임 */}
          <div className="flex flex-col gap-4">
            <label
              htmlFor="nickname"
              className="text-[var(--Secondary-800,#1F2937)] font-pretendard text-[18px] font-bold leading-[26px]"
            >
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요"
              className="h-[56px] w-full rounded-[12px] bg-[var(--Cool-Gray-100,#F3F4F6)] px-6 py-4"
              {...register("nickname", {
                validate: (v) =>
                  (!!v && v.trim().length >= 2) ||
                  "닉네임은 2자 이상 입력해주세요.",
              })}
            />
            {errors.nickname?.message && (
              <p className="text-sm text-red-500">{errors.nickname.message}</p>
            )}
          </div>
          {/* 비밀번호 */}
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
                {...register("password", { validate: passwordValidate })}
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

          {/* 비밀번호 확인 */}
          <div className="flex flex-col gap-4">
            <label
              htmlFor="passwordConfirm"
              className="text-[var(--Secondary-800,#1F2937)] font-pretendard text-[18px] font-bold leading-[26px]"
            >
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                id="passwordConfirm"
                type={showPw2 ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요"
                className="h-[56px] w-full rounded-[12px] bg-[var(--Cool-Gray-100,#F3F4F6)] px-6 py-4"
                {...register("passwordConfirm", {
                  validate: passwordConfirmValidate,
                })}
              />
              <button
                type="button"
                aria-label={showPw2 ? "비밀번호 숨기기" : "비밀번호 보이기"}
                onClick={() => setShowPw2((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Image
                  src={
                    showPw2 ? "/ic_visibility_on.svg" : "/ic_visibility_off.svg"
                  }
                  alt={showPw2 ? "비밀번호 보이는 중" : "비밀번호 가려진 상태"}
                  width={24}
                  height={24}
                />
              </button>
            </div>
            {errors.passwordConfirm?.message && (
              <p className="text-sm text-red-500">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          {/* 제출 버튼 */}
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
            {isSubmitting ? "가입 중..." : "회원가입"}
          </button>
        </form>

        {/* 간편 로그인 섹션 */}
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
                className="inline-flex h-10 items-center gap-2"
                aria-label="Google로 이동"
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
                aria-label="Kakao로 이동"
              >
                <Image src="/ic_kakao.png" alt="Kakao" width={42} height={42} />
              </a>
            </div>
          </div>
        </section>

        {/* 로그인 링크 */}
        <div className="mt-6 flex items-center justify-center text-sm gap-1">
          <span className="text-gray-800">이미 가입하셨나요?</span>
          <Link href="/signin" className="font-medium text-blue-500 underline">
            로그인
          </Link>
        </div>
      </section>

      <Modal
        open={modalOpen}
        message={modalMsg}
        onClose={() => {
          setModalOpen(false);
          if (postAuthNext) {
            router.replace(postAuthNext);
            setPostAuthNext(null);
          }
        }}
      />
    </main>
  );
}
