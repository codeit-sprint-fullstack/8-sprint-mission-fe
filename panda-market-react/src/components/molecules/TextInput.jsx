import styles from '../../styles/components/molecules/TextInput.module.css';

export function TextInput({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = 'text',
  onKeyDown,
  isValid = false,
  errorMessage = '',
}) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name} className={styles.inputLabel}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={`${styles.inputCommon} ${isValid ? styles.error : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {isValid && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
