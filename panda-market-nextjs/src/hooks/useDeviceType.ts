"use client";

import { useEffect, useState } from "react";

export function useDeviceType() {
  const getDeviceType = (width: number) => {
    if (width <= 743) return "mobile";
    if (width <= 1199) return "tablet";
    return "desktop";
  };

  const [deviceType, setDeviceType] = useState(getDeviceType(0));

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId); // 함수가 실행될 때 이전의 타임아웃 취소
      timeoutId = setTimeout(() => {
        setDeviceType(getDeviceType(window.innerWidth));
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId); // 컴포넌트가 언마운트 될 때 타임아웃 취소
    };
  }, [deviceType]);

  return deviceType;
}
