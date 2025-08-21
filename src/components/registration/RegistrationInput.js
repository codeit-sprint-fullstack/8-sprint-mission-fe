import React from 'react';
import styles from './RegistrationInput.module.css';

const RegistrationInput = ({ label, placeholder, value, onChange, multiline = false, rows = 1, error = '' }) => {
  return (
    <div className={styles.inputField}>
      <label className={styles.inputLabel}>
        {label}
      </label>
      {multiline ? (
        <>
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`${error ? styles.error : ''} ${styles.inputTextarea}`}
          />
          {error && <span className={styles.inputError}>{error}</span>}
        </>
      ) : (
        <>
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${error ? styles.error : ''} ${styles.inputText}`}
          />
          {error && <span className={styles.inputError}>{error}</span>}
        </>
      )}
    </div>
  );
};

export default RegistrationInput;