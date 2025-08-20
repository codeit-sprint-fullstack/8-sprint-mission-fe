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
        ×
      </button>
    </span>
  );
};

export default RegistrationTag;