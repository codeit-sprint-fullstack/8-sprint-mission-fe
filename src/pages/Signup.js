import React from 'react';
import SignupForm from '../components/SignupForm';
import AuthHeader from '../components/AuthHeader';
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