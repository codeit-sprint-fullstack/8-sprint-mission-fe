import React from 'react';
import styles from './RegistrationTag.module.css';

const RegistrationTag = ({ text, onRemove }) => {
  return (
    <span className={styles.tag}>
      #{text}
      <button
        onClick={onRemove}
        className={styles.tagRemoveBtn}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1.08008 1L9.08008 9" stroke="#F9FAFB" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M9 1L1 9" stroke="#F9FAFB" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </span>
  );
};

export default RegistrationTag;