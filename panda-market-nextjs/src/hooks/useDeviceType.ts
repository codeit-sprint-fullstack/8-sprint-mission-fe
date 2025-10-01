"use client";

import { useEffect, useState } from "react";

export function useDeviceType() {
  const getDeviceType = (width: number) => {
    if (width <= 743) return "mobile";
    if (width <= 1199) return "tablet";
    return "desktop";
  };

  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    setDeviceType(getDeviceType(window.innerWidth));
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDeviceType(getDeviceType(window.innerWidth));
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return deviceType;
}
