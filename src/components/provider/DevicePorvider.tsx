'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

//타입 스크립트는 context가 제공하는 value의 기본값과 타입을 지정해주어야 합니다.
const Context = createContext<DeviceType>('desktop');

//브라우저 창 너비에 따른 디바이스 구분 프로바이더입니다. (사실상 상품페이지에서만 사용됩니다.)
export function DeviceProvider({ children }: ProviderProps) {
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');

  // 창 크기에 따라 deviceType 계산
  function getDeviceType(width: number) {
    if (width >= 1200) return 'desktop';
    if (width >= 744) return 'tablet';
    return 'mobile';
  }

  // 창 크기 변경 감지
  useEffect(() => {
    const newType = getDeviceType(window.innerWidth);
    setDeviceType((prev) => (prev !== newType ? newType : prev));

    const handleResize = () => {
      const newType = getDeviceType(window.innerWidth);
      setDeviceType((prev) => (prev !== newType ? newType : prev));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <Context.Provider value={deviceType}>{children}</Context.Provider>;
}

export function useDeviceProvider() {
  return useContext(Context);
}
