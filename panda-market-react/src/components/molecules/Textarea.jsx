import styles from '../../styles/components/molecules/Textarea.module.css';

export function Textarea({ label, name, placeholder, value, onChange, resize = true }) {
  return (
    <div className={styles.textareaGroup}>
      <label htmlFor={name} className={styles.textareaLabel}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className={styles.textareaCommon}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ resize: resize ? 'vertical' : 'none' }}
      />
    </div>
  );
}
