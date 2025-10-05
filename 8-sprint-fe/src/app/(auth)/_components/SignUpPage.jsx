"use client";
import { AuthLogo } from "@/app/(components)/atoms/Logo";
import OAuth from "@/app/(components)/atoms/OAuth";
import PasswordInput from "@/app/(components)/atoms/PasswordInput";
import TextInput from "@/app/(components)/atoms/TextInput";
import Link from "next/link";
import React, { useState } from "react";
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordChecker,
} from "./validator";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [user, setUser] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const { signUp } = useAuth();
  const router = useRouter();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setUser((prev) => ({
      ...prev,
      email: value,
    }));
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setUser((prev) => ({
      ...prev,
      nickname: value,
    }));
    setErrors((prev) => ({ ...prev, nickname: validateNickname(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setUser((prev) => ({
      ...prev,
      password: value,
    }));
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handlePasswordCheckerChange = (e) => {
    const value = e.target.value;
    setUser((prev) => ({
      ...prev,
      passwordConfirmation: value,
    }));
    setErrors((prev) => ({
      ...prev,
      passwordConfirmation: validatePasswordChecker(value, user.password),
    }));
  };

  // 버튼 활성화 조건
  const isFormValid =
    user.email !== "" &&
    user.password !== "" &&
    user.nickname !== "" &&
    user.passwordConfirmation !== "" &&
    !errors.email &&
    !errors.password &&
    !errors.nickname &&
    !errors.passwordConfirmation;

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    if (!isFormValid) {
      console.log("invalidate");
      return;
    }

    try {
      await signUp(user);

      // 회원가입 성공 후 처리
      alert("회원가입에 성공했습니다.");
      router.push("/items");
    } catch (error) {
      alert(error.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <>
      <Link href="/">
        <AuthLogo />
      </Link>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <TextInput
          name="email"
          title="이메일"
          placeholder="이메일을 입력해주세요"
          value={user?.email}
          onChange={handleEmailChange}
          errmessage={errors.email}
          isValid={!errors.email && user.email !== ""}
        />
        <TextInput
          name="nickname"
          title="닉네임"
          placeholder="닉네임을 입력해주세요"
          value={user?.nickname}
          onChange={handleNicknameChange}
          errmessage={errors.nickname}
          isValid={!errors.nickname && user.nickname !== ""}
        />
        <PasswordInput
          name="password"
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          value={user?.password}
          onChange={handlePasswordChange}
          errmessage={errors.password}
          isValid={!errors.password && user.password !== ""}
        />
        <PasswordInput
          name="passwordChecker"
          title="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          value={user?.passwordConfirmation}
          onChange={handlePasswordCheckerChange}
          errmessage={errors.passwordConfirmation}
          isValid={
            !errors.passwordConfirmation && user.passwordConfirmation !== ""
          }
        />
        <button
          type="submit"
          // disabled={isFormValid}
          className={`w-full h-14 flex items-center justify-center rounded-4xl text-gray-100 text-xl font-semibold
            ${isFormValid ? "bg-Primary-100 cursor-pointer" : "bg-gray-400"}`}
        >
          회원가입
        </button>
        <OAuth />
        <div className="w-full text-center text-sm">
          <span className="text-gray-800 mr-1">이미 회원이신가요?</span>
          <Link href="/login">
            <span className="text-Primary-100 underline">로그인</span>
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignUpPage;
