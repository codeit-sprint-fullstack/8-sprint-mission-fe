import styles from '../../styles/components/molecules/FeatureItem.module.css';

export function FeatureItem({ imgSrc, alt, textTag, title, text }) {
  return (
    <article className={styles.featureItem}>
      <img src={imgSrc} alt={alt} />
      <div className={styles.itemTextContainer}>
        <p className={styles.textTag}>{textTag}</p>
        <h2>
          {title[0]}
          <br className={styles.desktopOnly} />
          {title[1]}
        </h2>
        <p className={styles.itemText}>
          {text[0]}
          <br />
          {text[1]}
        </p>
      </div>
    </article>
  );
}
