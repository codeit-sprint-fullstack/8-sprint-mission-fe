import { Link } from 'react-router-dom';
import styles from '../../styles/components/molecules/TextBanner.module.css';

export function TextBanner({ imgSrc, title, btnText, linkTo, isSection2 }) {
  return (
    <section className={`${styles.heroSection} ${isSection2 ? styles.heroSection2 : ''}`}>
      <div className={styles.heroTextContainer} style={{ backgroundImage: `url(${imgSrc})` }}>
        <h1>
          {title[0]}
          <br className={styles.tabletNone} />
          {title[1]}
        </h1>
        {btnText && (
          <Link to={linkTo} className="btn-large">
            {btnText}
          </Link>
        )}
      </div>
    </section>
  );
}
