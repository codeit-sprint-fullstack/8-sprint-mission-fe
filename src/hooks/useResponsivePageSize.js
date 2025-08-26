import { useEffect, useState } from "react";

function bpFromWidth(w) {
  if (w >= 1024) return "desktop";
  if (w >= 768) return "tablet";
  return "mobile";
}

function getBP() {
  return bpFromWidth(window.innerWidth);
}

export function useResponsivePageSize(kind) {
  const [bp, setBp] = useState(getBP());

  useEffect(() => {
    let tid = null;
    const onR = () => {
      clearTimeout(tid);
      tid = setTimeout(() => {
        const next = getBP();
        setBp((prev) => (prev === next ? prev : next));
      }, 120); // 120ms 디바운스
    };
    window.addEventListener("resize", onR);
    return () => {
      clearTimeout(tid);
      window.removeEventListener("resize", onR);
    };
  }, []);

  const cols =
    kind === "best"
      ? bp === "desktop"
        ? 4
        : bp === "tablet"
        ? 2
        : 1
      : bp === "desktop"
      ? 5
      : bp === "tablet"
      ? 3
      : 2;

  const rows = 2;
  const pageSize = cols * rows;
  return { bp, cols, rows, pageSize };
}
