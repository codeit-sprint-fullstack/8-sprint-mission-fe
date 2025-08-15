import styles from '../../styles/components/molecules/Textarea.module.css';

export function Textarea({
  label,
  name,
  placeholder,
  value,
  onChange,
  resize = true,
  isValid = false,
  errorMessage = '',
}) {
  return (
    <div className={styles.textareaGroup}>
      <label htmlFor={name} className={styles.textareaLabel}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className={`${styles.textareaCommon} ${isValid ? styles.error : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ resize: resize ? 'vertical' : 'none' }}
      />
      {isValid && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
