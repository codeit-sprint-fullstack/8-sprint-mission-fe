import React, { useState } from 'react';
import { useRegistrationInputCheck } from '../../utils/useRegistrationInputCheck';
import RegistrationTag from './RegistrationTag';
import styles from './RegistrationTagSection.module.css';

const RegistrationTagSection = ({ label, tags, onTagAdd, onTagRemove, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const { errors, checkTag } = useRegistrationInputCheck();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      onTagAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className={styles.tagSection}>
      <label className={styles.inputLabel}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        className={`${errors.tag ? styles.error : ''} ${styles.inputText}`}
        onChange={(e) => {
          setInputValue(e.target.value)
          checkTag(e.target.value);
        }}
        onKeyDown={handleKeyPress}
      />
      {errors.tag && <span className={styles.inputError}>{errors.tag}</span>}
      <div className={styles.tagList}>
        {tags.map((tag, index) => (
          <RegistrationTag
            key={index}
            text={tag}
            onRemove={() => onTagRemove(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RegistrationTagSection;