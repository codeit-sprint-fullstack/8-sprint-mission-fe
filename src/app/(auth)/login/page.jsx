"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// ✅ util에서 가져오기 (데모용)
import { USER_DATA, validateEmail, validatePassword } from "@/app/(lib)/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailMsg = useMemo(() => validateEmail(email.trim()), [email]);
  const passwordMsg = useMemo(
    () => validatePassword(password.trim()),
    [password]
  );
  const disabled = !!emailMsg || !!passwordMsg;

  const onSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;

    const found = USER_DATA.find(
      (u) => u.email === email.trim() && u.password === password.trim()
    );
    if (!found) {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    alert("로그인 성공!");
    router.push("/");
  };

  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl ring-1 ring-coolGray-200">
        <div className="mb-8 flex flex-col items-center">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="홈으로"
          >
            <Image
              src="/login_pand_face.png"
              alt="로그인 판다"
              width={64}
              height={64}
            />
            <span className="text-xl font-bold text-secondary-700">
              판다마켓
            </span>
          </Link>
        </div>

        <form id="login_form" className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-secondary-700"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-coolGray-200 bg-white px-3 py-2 text-[0.95rem] outline-none ring-brand-blue/0 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
            {!!emailMsg && (
              <p id="email_msg" className="text-sm text-red-500">
                {emailMsg}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-secondary-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-coolGray-200 bg-white px-3 py-2 text-[0.95rem] outline-none ring-brand-blue/0 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
            {!!passwordMsg && (
              <p id="password_msg" className="text-sm text-red-500">
                {passwordMsg}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={disabled}
            className={[
              "mt-2 inline-flex h-12 w-full items-center justify-center rounded-md text-base font-semibold transition",
              disabled
                ? "cursor-not-allowed bg-coolGray-200 text-coolGray-400"
                : "bg-brand-blue text-coolGray-100 hover:opacity-90 active:opacity-80",
            ].join(" ")}
          >
            로그인
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-coolGray-400">계정이 없으신가요?</span>
          <Link
            href="/signup"
            className="font-medium text-brand-blue hover:underline"
          >
            회원가입
          </Link>
        </div>
      </section>
    </main>
  );
}
