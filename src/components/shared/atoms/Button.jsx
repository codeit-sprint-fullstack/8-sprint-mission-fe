'use client';

import React from 'react';

import styles from './Button.module.css';

const Button = ({ children, variant = 'primary', size = 'large', ...props }) => {
  const classNames = `${styles.button} ${styles[variant]} ${styles[size]}`;
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
