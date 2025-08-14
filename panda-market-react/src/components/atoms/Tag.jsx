import styles from '../../styles/components/atoms/Tag.module.css';

export function Tag({ label, type = 'default', onClick }) {
  return (
    <span className={styles.tagWrapper}>
      <span className={styles.tagLabel}>#{label}</span>
      {type === 'btn' && (
        <button className={styles.closeButton} onClick={onClick} name={label}>
          <img src="/components/atoms/close-btn.svg" alt="close" />
        </button>
      )}
    </span>
  );
}
