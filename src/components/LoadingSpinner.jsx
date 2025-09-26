'use client';

import { BeatLoader } from 'react-spinners';
import styles from '@/styles/components/LoadingSpinner.module.scss';

const LoadingSpinner = ({ fullscreen = true }) => {
  const containerClass = fullscreen ? styles.overlay : styles.container;

  return (
    <div className={`${containerClass}`}>
      <div className={styles.spinner}>
        <BeatLoader color="#3692ff" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
