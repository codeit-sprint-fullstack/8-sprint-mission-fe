import { useEffect, useRef, useState } from "react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "검색할 상품을 입력해주세요",
  debounce = 0,
}) {
  const [inner, setInner] = useState(value ?? "");
  const didMount = useRef(false);

  // 외부 value 동기화
  useEffect(() => {
    setInner(value ?? "");
  }, [value]);

  // 입력 변화 시 onChange 호출 (마운트 직후는 스킵)
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return; // 최초 렌더에서는 onChange 호출 X
    }
    if (!onChange) return;

    if (debounce > 0) {
      const id = setTimeout(() => onChange(inner), debounce);
      return () => clearTimeout(id);
    } else {
      onChange(inner);
    }
  }, [inner, debounce, onChange]);

  return (
    <div className="search">
      <input
        placeholder={placeholder}
        value={inner}
        onChange={(e) => setInner(e.target.value)}
      />
    </div>
  );
}
