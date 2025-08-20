import React, { useState } from 'react';
import RegistrationTag from './RegistrationTag';
import styles from './RegistrationTagSection.module.css';

const RegistrationTagSection = ({ label, tags, onTagAdd, onTagRemove, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className={styles.inputText}
      />
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