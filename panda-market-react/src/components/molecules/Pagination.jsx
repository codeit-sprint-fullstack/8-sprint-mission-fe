import { Fragment, useEffect, useState } from 'react';
import styles from '../../styles/components/molecules/Pagination.module.css';
import { Link } from 'react-router-dom';

export function Pagination({
  totalItems,
  productCountPerPage,
  pageCount,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / productCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <div className={styles.pagination}>
      <ul>
        <li className={`${styles.move} ${noPrev && styles.invisible}`}>
          <Link
            to={`?page=${Math.max(1, start - 1)}`}
            onClick={() => onPageChange(Math.max(1, start - 1))}
          >
            <img src="/product-list/prev-icon.svg" alt="이전" />
          </Link>
        </li>
        {[...Array(pageCount)].map((a, i) => (
          <Fragment key={i}>
            {start + i <= totalPages && (
              <li key={i}>
                <Link
                  className={`${styles.page} ${currentPage === start + i && styles.active}`}
                  to={`?page=${start + i}`}
                  onClick={() => onPageChange(start + i)}
                >
                  {start + i}
                </Link>
              </li>
            )}
          </Fragment>
        ))}
        <li className={`${styles.move} ${noNext && styles.invisible}`}>
          <Link
            to={`?page=${Math.min(totalPages, start + pageCount)}`}
            onClick={() => onPageChange(Math.min(totalPages, start + pageCount))}
          >
            <img src="/product-list/next-icon.svg" alt="다음" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
