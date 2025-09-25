'use client';

import { BeatLoader } from 'react-spinners';
import styles from '@/styles/components/LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}>
        <BeatLoader color="#3692ff" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
