import React from 'react';
import styles from './RegistrationInput.module.css';

const RegistrationInput = ({ label, placeholder, value, onChange, multiline = false, rows = 1 }) => {
  return (
    <div className={styles.inputField}>
      <label className={styles.inputLabel}>
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={styles.inputTextarea}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.inputText}
        />
      )}
    </div>
  );
};

export default RegistrationInput;