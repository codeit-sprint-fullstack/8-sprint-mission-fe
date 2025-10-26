"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Text from "@/components/atoms/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Alert from "@/components/organisms/Alert";
import { loginSchema, LoginSchema } from "@/lib/schema/auth";
import { useAuthQuery } from "@/lib/api/auth/queries";
import { Login } from "@/lib/api/auth/fetchers";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutate: postLoginMutation,
    isPending,
    isError,
    error: loginError,
  } = useAuthQuery.usePostLogin();

  const onSubmit = (data: Login) => {
    postLoginMutation(data, {
      onSuccess: () => {
        router.push("/product");
      },
      onError: (error) => {
        console.error("로그인 중 오류가 발생했습니다:", error);
        setAlertMessage(
          loginError?.message ||
            error.message ||
            "로그인 중 오류가 발생했습니다."
        );
        setAlertOpen(true);
      },
    });
  };

  /**
   * 비밀번호 표시/숨김 토글
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Text styleName="text-lg-medium">
          <Spinner /> 로그인 중
        </Text>
      </div>
    );
  }

  return (
    <main className="flex justify-center bg-(--background-color) pt-24 pb-24">
      <div className="w-full max-w-[640px] px-4 md:px-0">
        {/* 로고 */}
        <div className="text-center mb-16">
          <Link href="/">
            <Image
              src="/header/logo-lg.svg"
              alt="판다마켓 로고"
              width={198}
              height={132}
              className="mx-auto w-[198px] md:w-auto"
            />
          </Link>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          {/* 이메일 입력 */}
          <div className="mb-6">
            <Text
              styleName="text-md-medium"
              className="block mb-3 text-(--secondary-color-800)"
            >
              이메일
            </Text>
            <Input
              {...register("email")}
              type="email"
              placeholder="이메일을 입력해주세요"
              className="bg-(--secondary-color-100) py-3 px-6 h-[auto] w-full"
            />
            {errors.email && (
              <Text
                styleName="text-md-regular"
                className="text-(--error-color) mt-2"
              >
                {errors.email.message}
              </Text>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-6">
            <Text
              styleName="text-md-medium"
              className="block mb-3 text-(--secondary-color-800)"
            >
              비밀번호
            </Text>
            <div className="relative">
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                autoComplete="off"
                className="bg-(--secondary-color-100) py-3 px-6 h-[auto] w-full pr-14"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <Image
                  src={
                    showPassword
                      ? "/auth/visible-icon.svg"
                      : "/auth/hidden-icon.svg"
                  }
                  alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                  width={24}
                  height={24}
                />
              </button>
            </div>
            {errors.password && (
              <Text
                styleName="text-md-regular"
                className="text-(--error-color) mt-2"
              >
                {errors.password.message}
              </Text>
            )}
          </div>

          {/* 로그인 버튼 */}
          <Button
            type="submit"
            variant={isValid ? "default" : "disabled"}
            disabled={!isValid || isPending}
            className="w-full py-3 h-[auto] cursor-pointer"
          >
            로그인
          </Button>
        </form>

        {/* 간편 로그인 */}
        <div className="mb-6 flex justify-between items-center bg-[#E6F2FF] px-5 py-4 rounded-2xl">
          <Text
            styleName="text-md-regular"
            className="text-(--secondary-color-800)"
          >
            간편 로그인 하기
          </Text>
          <div className="flex justify-center gap-4">
            <Link
              href="https://www.google.com"
              target="_blank"
              className="flex items-center justify-center bg-white rounded-full "
            >
              <Image
                src="/auth/google-icon.svg"
                alt="구글 로그인"
                width={42}
                height={42}
              />
            </Link>
            <Link
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              className="flex items-center justify-center bg-white rounded-full "
            >
              <Image
                src="/auth/kakao-icon.svg"
                alt="카카오 로그인"
                width={42}
                height={42}
              />
            </Link>
          </div>
        </div>

        {/* 회원가입 링크 */}
        <div className="text-center">
          <Text
            styleName="text-md-regular"
            className="text-(--secondary-color-600)"
          >
            <span>판다마켓이 처음이신가요?</span>{" "}
            <Link
              href="/auth/join"
              className="text-(--primary-color) underline transition-colors"
            >
              회원가입
            </Link>
          </Text>
        </div>

        {/* Alert 컴포넌트 */}
        <Alert
          open={alertOpen}
          onOpenChange={setAlertOpen}
          message={alertMessage}
        />
      </div>
    </main>
  );
}
