import { useState } from 'react';

export function useAuthInputCheck() {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    if (email === '') {
      setErrors((prev) => ({ ...prev, email: '이메일을 입력해주세요.' }));
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prev) => ({ ...prev, email: '잘못된 이메일 형식입니다' }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
      return true;
    }
  };

  const checkName = (name) => {
    if (name.trim() === '') {
      setErrors((prev) => ({ ...prev, name: '닉네임을 입력해주세요.' }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, name: '' }));
      return true;
    }
  };

  const checkPassword = (password) => {
    if (password === '') {
      setErrors((prev) => ({ ...prev, password: '비밀번호를 입력해주세요.' }));
      return false;
    } else if (password.length < 8) {
      setErrors((prev) => ({ ...prev, password: '비밀번호를 8자 이상 입력해주세요.' }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
      return true;
    }
  };

  const checkPasswordConfirm = (password, passwordConfirm) => {
    if (passwordConfirm === '') {
      setErrors((prev) => ({ ...prev, passwordConfirm: '비밀번호를 다시 입력해주세요.' }));
      return false;
    } else if (password !== passwordConfirm) {
      setErrors((prev) => ({ ...prev, passwordConfirm: '비밀번호가 일치하지 않습니다.' }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, passwordConfirm: '' }));
      return true;
    }
  };

  return {
    errors,
    validateEmail,
    checkName,
    checkPassword,
    checkPasswordConfirm,
  };
}
