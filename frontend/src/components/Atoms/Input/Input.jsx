'use client';

import styles from './Input.module.css';

export default function Input({
  name = '',
  value,
  onChange,
  label = '',
  error = '',
  placeholder = '',
  ...props
}) {
  return (
    <div className={styles.inputGroup}>
      <div className="flex w-[100%] flex-col gap-[10px]">
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <input
          className={`${styles.input} ${error ? styles.error : ''}`}
          {...props}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
}
