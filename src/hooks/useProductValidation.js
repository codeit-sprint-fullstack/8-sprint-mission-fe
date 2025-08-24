import { useMemo, useState } from "react";

export default function useProductValidation({
  name,
  description,
  price,
  tags,
  tagInput,
}) {
  const [touched, setTouched] = useState({
    name: false,
    description: false,
    price: false,
    tags: false,
    tagInput: false,
  });

  const errors = useMemo(() => {
    const e = {};

    const nm = String(name || "").trim();
    if (!nm) e.name = "상품명을 입력해주세요.";
    else if (nm.length > 10) e.name = "상품명은 10자 이내로 입력해주세요.";

    const desc = String(description || "").trim();
    if (!desc) e.description = "상품 소개를 입력해주세요.";
    else if (desc.length < 10 || desc.length > 100) {
      e.description = "상품 소개는 10자 이상, 100자 이내로 입력해주세요.";
    }

    const pr = String(price ?? "").trim();
    if (!pr) e.price = "판매 가격을 입력해주세요.";
    else if (!/^\d+$/.test(pr)) e.price = "판매 가격은 숫자만 입력해주세요.";

    const tgs = Array.isArray(tags) ? tags.map((t) => String(t).trim()) : [];
    const tooLong = tgs.filter((t) => t.length > 5);
    if (tgs.length === 0) e.tags = "태그를 1개 이상 입력해주세요.";
    else if (tooLong.length > 0) e.tags = "태그는 5글자 이내만 가능합니다.";

    const ti = String(tagInput || "").trim();
    if (ti && ti.length > 5) e.tagInput = "태그는 5글자 이내만 가능합니다.";

    return e;
  }, [name, description, price, tags, tagInput]);

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
    touched,
    setTouched,

    onBlur: (field) => () => setTouched((p) => ({ ...p, [field]: true })),
    shouldShow: (field, submitted) =>
      !!(errors[field] && (touched[field] || submitted)),
  };
}
