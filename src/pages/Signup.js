import React from 'react';
import SignupForm from '../components/auth/SignupForm';
import AuthHeader from '../components/auth/AuthHeader';
import styles from './Auth.module.css';

const Signup = () => {
  return (
    <div id={styles.wrapper}>
      <div className={styles.container}>
        <AuthHeader />
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;