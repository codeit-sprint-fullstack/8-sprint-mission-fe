import React, { useState } from 'react';
import { useInputCheck } from '../utils/inputCheck';
import styles from './SignupForm.module.css';
import SocialLogin from './SocialLogin';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { errors, validateEmail, checkName, checkPassword, checkPasswordConfirm } = useInputCheck();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmail = validateEmail(email);
    const validName = checkName(name);
    const validPassword = checkPassword(password);
    const validPasswordConfirm = checkPasswordConfirm(password, passwordConfirm);

    if (!validEmail || !validName || !validPassword || !validPasswordConfirm) {
      return;
    }
    // 회원가입 로직 (예: API 호출)
    console.log('User signed up:', { email, name, password });
  };

  return (
    <form className={styles['form-box']} onSubmit={handleSubmit}>
      <div className={styles['input-box']}>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해 주세요"
        />
        <span>{errors.email}</span>
      </div>
      <div className={styles['input-box']}>
        <label htmlFor="name">닉네임</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="닉네임을 입력해 주세요"
        />
        <span>{errors.name}</span>
      </div>
      <div className={styles['input-box']}>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요"
        />
        <span>{errors.password}</span>
      </div>
      <div className={styles['input-box']}>
        <label htmlFor="password-confirm">비밀번호 확인</label>
        <input
          type="password"
          id="password-confirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
        />
        <span>{errors.passwordConfirm}</span>
      </div>
      <button className={styles['form-btn']} type="submit">회원가입</button>
      <SocialLogin />
      <div className={styles['loginSignup']}>
        이미 회원이신가요?
        <a href="/login/">로그인</a>
      </div>
    </form>
  );
};

export default SignupForm;