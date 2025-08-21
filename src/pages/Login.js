import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import AuthHeader from '../components/auth/AuthHeader';
import styles from './Auth.module.css';

const Login = () => {
  return (
    <div id={styles.wrapper}>
      <div className={styles.container}>
        <AuthHeader />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;