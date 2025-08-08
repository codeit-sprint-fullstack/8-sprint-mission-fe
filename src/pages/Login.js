import React from 'react';
import LoginForm from '../components/LoginForm';
import AuthHeader from '../components/AuthHeader';
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