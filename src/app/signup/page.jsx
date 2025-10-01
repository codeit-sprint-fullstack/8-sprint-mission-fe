"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Custom Alert 컴포넌트
function CustomAlert({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10">
      <div className="w-[540px] h-[250px] bg-white rounded-xl p-10 flex flex-col justify-between shadow-xl">
        <p className="text-xl text-gray-800 text-center flex-grow flex justify-center items-center">
          {message}
        </p>
        <button
          className="flex w-[120px] h-12 justify-center items-center rounded-md bg-blue-500 text-white text-base self-end"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const validateEmail = (val) => {
    if (!val) return "이메일을 입력해주세요.";
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(val))
      return "올바른 이메일 형식이 아닙니다.";
    return "";
  };

  const validatePassword = (val) => {
    if (!val) return "비밀번호를 입력해주세요.";
    if (val.length < 8) return "비밀번호는 최소 8자 이상이어야 합니다.";
    return "";
  };

  const validateConfirm = (pw, cp) => {
    if (!cp) return "비밀번호 확인을 입력해주세요.";
    if (pw !== cp) return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email.trim());
    const pwErr = validatePassword(password.trim());
    const confirmErr = validateConfirm(password.trim(), confirmPassword.trim());

    setEmailError(emailErr);
    setPasswordError(pwErr);
    setConfirmError(confirmErr);

    if (emailErr || pwErr || confirmErr) return;

    // 회원가입 성공
    setAlertMsg("회원가입이 완료되었습니다!");
    setTimeout(() => router.push("/login"), 1000);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full px-10 py-10 overflow-y-auto">
      <div className="flex flex-col items-center w-[40rem] max-w-[40rem] gap-10 mx-auto">
        <header>
          <a href="/">
            <img
              src="/images/logo.svg"
              alt="로고"
              className="w-[24.75rem] h-[8.25rem]"
            />
          </a>
        </header>
        <main>
          <form
            className="flex flex-col w-[40rem] max-w-[40rem] gap-6"
            onSubmit={handleSubmit}
          >
            {/* 이메일 */}
            <div className="flex flex-col gap-4 relative">
              <label className="text-lg font-bold text-gray-800">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(validateEmail(e.target.value));
                }}
                placeholder="이메일을 입력하세요"
                className={`h-14 px-6 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500 ${
                  emailError ? "ring-2 ring-red-500" : ""
                }`}
              />
              {emailError && (
                <div className="text-sm text-red-500 mt-1">{emailError}</div>
              )}
            </div>

            {/* 닉네임 */}
            <div className="flex flex-col gap-4">
              <label className="text-lg font-bold text-gray-800">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
                className="h-14 px-6 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-4 relative">
              <label className="text-lg font-bold text-gray-800">비밀번호</label>
              <div className="relative h-14">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(validatePassword(e.target.value));
                  }}
                  placeholder="비밀번호를 입력하세요"
                  className={`w-full h-full px-6 pr-12 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500 ${
                    passwordError ? "ring-2 ring-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6"
                >
                  <img
                    src={
                      showPassword
                        ? "/images/eye(open).svg"
                        : "/images/eye(close).svg"
                    }
                    alt="eye"
                  />
                </button>
              </div>
              {passwordError && (
                <div className="text-sm text-red-500 mt-1">{passwordError}</div>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div className="flex flex-col gap-4 relative">
              <label className="text-lg font-bold text-gray-800">
                비밀번호 확인
              </label>
              <div className="relative h-14">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmError(validateConfirm(password, e.target.value));
                  }}
                  placeholder="비밀번호를 다시 입력하세요"
                  className={`w-full h-full px-6 pr-12 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500 ${
                    confirmError ? "ring-2 ring-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6"
                >
                  <img
                    src={
                      showConfirmPassword
                        ? "/images/eye(open).svg"
                        : "/images/eye(close).svg"
                    }
                    alt="eye"
                  />
                </button>
              </div>
              {confirmError && (
                <div className="text-sm text-red-500 mt-1">{confirmError}</div>
              )}
            </div>

            {/* 버튼 */}
            <button
              type="submit"
              className="flex justify-center items-center h-14 w-full rounded-full bg-gray-400 text-gray-100 text-xl font-semibold cursor-pointer hover:bg-blue-500 hover:text-white"
            >
              회원가입
            </button>

            {/* 간편 로그인 */}
            <div className="flex flex-col p-4 gap-2.5 rounded-md bg-blue-50 w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-medium text-gray-800">간편 로그인</p>
                <div className="flex gap-4">
                  <a href="https://www.google.com/" target="_blank">
                    <img
                      className="w-6 h-6"
                      src="/images/google.svg"
                      alt="구글"
                    />
                  </a>
                  <a href="https://www.kakaocorp.com/page/" target="_blank">
                    <img
                      className="w-6 h-6"
                      src="/images/kakao.svg"
                      alt="카카오"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* 안내 */}
            <p className="text-sm text-center text-gray-800">
              이미 회원이신가요?{" "}
              <a href="/login" className="underline">
                로그인
              </a>
            </p>
          </form>
        </main>

        <CustomAlert message={alertMsg} onClose={() => setAlertMsg("")} />
      </div>
    </div>
  );
}
