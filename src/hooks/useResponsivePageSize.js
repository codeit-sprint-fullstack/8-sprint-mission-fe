import { useEffect, useState } from "react";

function getBP() {
  const w = window.innerWidth;
  if (w >= 1200) return "desktop";
  if (w >= 768) return "tablet";
  return "mobile";
}

export function useResponsivePageSize(kind) {
  const [bp, setBp] = useState(getBP());
  useEffect(() => {
    const onR = () => setBp(getBP());
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
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
