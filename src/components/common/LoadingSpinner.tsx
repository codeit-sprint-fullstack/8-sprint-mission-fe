'use client';

import { BeatLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-white/40 backdrop-blur-[6px]">
      <div className="flex items-center justify-center">
        <BeatLoader color="#3692ff" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
