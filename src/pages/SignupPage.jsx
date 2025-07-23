import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Logo from '../components/Logo';
import googleIcon from '../assets/google_icon.svg';
import kakaoIcon from '../assets/kakao_icon.svg';

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="w-[400px] p-10 border-2 border-yellow-400 rounded">
        <Logo />

        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#3692FF]"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">닉네임</label>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#3692FF]"
          />
        </div>

        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-semibold">비밀번호</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#3692FF]"
          />
          <button
            type="button"
            className="absolute top-9 right-3"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-semibold">비밀번호 확인</label>
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#3692FF]"
          />
          <button
            type="button"
            className="absolute top-9 right-3"
            onClick={() => setShowConfirm(prev => !prev)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button className="w-full bg-gray-600 text-white py-2 rounded mb-4">
          회원가입
        </button>

        <div className="bg-gray-100 py-3 px-4 rounded flex justify-between items-center">
          <span className="text-sm text-gray-600">간편 로그인하기</span>
          <div className="flex gap-3">
            <a href="https://www.google.com/" target="_blank" rel="noreferrer">
              <img src={googleIcon} alt="구글 로그인" className="w-6" />
            </a>
            <a href="https://www.kakaocorp.com/page/" target="_blank" rel="noreferrer">
              <img src={kakaoIcon} alt="카카오 로그인" className="w-6" />
            </a>
          </div>
        </div>

        <p className="text-center text-sm mt-4">
          이미 회원이신가요?{' '}
          <button onClick={() => navigate('/login')} className="text-blue-600 font-semibold">
            로그인
          </button>
        </p>
      </div>
    </div>
  );
}