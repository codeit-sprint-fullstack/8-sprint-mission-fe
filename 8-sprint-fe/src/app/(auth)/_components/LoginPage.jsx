"use client";
import { AuthLogo } from "@/app/(components)/atoms/Logo";
import OAuth from "@/app/(components)/atoms/OAuth";
import PasswordInput from "@/app/(components)/atoms/PasswordInput";
import TextInput from "@/app/(components)/atoms/TextInput";
import Link from "next/link";
import React, { useState } from "react";
import { validateEmail, validatePassword } from "./validator";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const router = useRouter();

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setValue((prev) => ({
      ...prev,
      email: val,
    }));
    setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setValue((prev) => ({
      ...prev,
      password: val,
    }));
    setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
  };

  // 버튼 활성화 조건
  const isFormValid =
    value.email !== "" &&
    value.password !== "" &&
    !errors.email &&
    !errors.password;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      console.log("invalidate");
      return;
    }

    try {
      await login(value);

      alert("로그인에 성공했습니다.");
      router.push("/items");
    } catch (error) {
      alert(error.message || "로그인에 실패했습니다.");
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
          value={value.email}
          onChange={handleEmailChange}
          errmessage={errors.email}
          isValid={!errors.email && value.email !== ""}
        />
        <PasswordInput
          name="password"
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          value={value.password}
          onChange={handlePasswordChange}
          errmessage={errors.password}
          isValid={!errors.password && value.password !== ""}
        />
        <button
          type="submit"
          // disabled={isFormValid}
          className={`w-full h-14 flex items-center justify-center rounded-4xl text-gray-100 text-xl font-semibold
            ${isFormValid ? "bg-Primary-100 cursor-pointer" : "bg-gray-400"}`}
        >
          로그인
        </button>
        <OAuth />
        <div className="w-full text-center text-sm">
          <span className="text-gray-800 mr-1">판다마켓은 처음이신가요?</span>
          <Link href="/signup">
            <span className="text-Primary-100 underline">회원가입</span>
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
