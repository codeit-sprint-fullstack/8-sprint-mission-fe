
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInputCheck } from '../utils/inputCheck';
import { USER_DATA } from '../data/users';
import styles from './SignupForm.module.css';
import SocialLogin from './SocialLogin';

const SignupForm = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const { errors, validateEmail, checkName, checkPassword, checkPasswordConfirm } = useInputCheck();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmail = validateEmail(email);
    const validName = checkName(name);
    const validPassword = checkPassword(password);
    const validPasswordConfirm = checkPasswordConfirm(password, passwordConfirm);

    if (!validEmail || !validName || !validPassword || !validPasswordConfirm) {
      return;
    }

    const isEmailExist = USER_DATA.some((user) => user.email === email);
    if (isEmailExist) {
      setError('사용 중인 이메일입니다');
      return;
    }

    navigate('/items');
  };

  const handleCloseError = () => {
    setError('');
  };

  const isFormValid =
    email && name && password && passwordConfirm &&
    !errors.email && !errors.name && !errors.password && !errors.passwordConfirm;

  return (
    <>
      <div className={error ? `${styles.overlay} ${styles.show}` : styles.overlay}>
        <div className={styles['overlay-content']}>
          <div className={styles['alert-box']}>
            <span>{error}</span>
            <button className={styles['close-btn']} onClick={handleCloseError}>확인</button>
          </div>
        </div>
      </div>
      <form className={styles['form-box']} onSubmit={handleSubmit}>
        <div className={styles['input-box']}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
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
            onChange={(e) => {
              setName(e.target.value);
              checkName(e.target.value);
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
              checkPassword(e.target.value);
            }}
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
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              checkPasswordConfirm(password, e.target.value);
            }}
            placeholder="비밀번호를 다시 한 번 입력해 주세요"
          />
          <span>{errors.passwordConfirm}</span>
        </div>
        <button
          className={isFormValid ? `${styles['form-btn']} ${styles.active}` : styles['form-btn']}
          type="submit"
          disabled={!isFormValid}
        >
          회원가입
        </button>
        <SocialLogin />
        <div className={styles['loginSignup']}>
          이미 회원이신가요?
          <a href="/login/">로그인</a>
        </div>
      </form>
    </>
  );
};

export default SignupForm;