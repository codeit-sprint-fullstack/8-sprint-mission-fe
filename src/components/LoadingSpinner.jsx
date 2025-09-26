'use client';

import { BeatLoader } from 'react-spinners';
import styles from '@/styles/components/LoadingSpinner.module.scss';

const LoadingSpinner = ({ fullscreen = true, blur = true }) => {
  const containerClass = fullscreen ? styles.overlay : styles.container;
  const overlayClass = fullscreen && blur ? styles.blur : styles.noBlur;

  return (
    <div className={`${containerClass} ${overlayClass}`}>
      <div className={styles.spinner}>
        <BeatLoader color="#3692ff" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
