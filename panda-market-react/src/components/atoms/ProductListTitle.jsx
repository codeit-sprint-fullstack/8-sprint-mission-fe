import styles from '../../styles/components/atoms/ProductListTitle.module.css';

export function ProductListTitle({ title }) {
  return <h1 className={styles.productListTitle}>{title}</h1>;
}
