import React, { useState } from 'react';
import { useInputCheck } from '../utils/inputCheck';
import { useNavigate, Link } from 'react-router-dom';
import { USER_DATA } from '../data/users';
import SocialLogin from './SocialLogin';
import styles from './LoginForm.module.css';

export async function login(email, password) {
  const user = USER_DATA.find(u => u.email === email && u.password === password);
  if (user) {
    return { success: true };
  } else {
    return { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' };
  }
}

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { errors, validateEmail, checkPassword } = useInputCheck();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = checkPassword(password);
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    } else {
      navigate('/items');
    }
  };

  const handleCloseError = () => {
    setError('');
  };

  // 모든 입력값이 유효한지 확인
  const isFormValid =
    email && password && !errors.email && !errors.password;

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
      <div className={styles['error-message']}></div>
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
            required
          />
          {errors.email && <span className={styles['error-message']}>{errors.email}</span>}
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
            required
          />
          {errors.password && <span className={styles['error-message']}>{errors.password}</span>}
        </div>
        <button
          className={isFormValid ? `${styles['form-btn']} ${styles.active}` : styles['form-btn']}
          type="submit"
        >
          로그인
        </button>
        <SocialLogin />
        <div className={styles.loginSignup}>
          판다마켓이 처음이신가요?
          <Link to="/signup">회원가입</Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;