import { useMemo } from "react";

export function useProductRules() {
  const nameOK = (v = "") => {
    const n = v.trim();
    return n.length >= 1 && n.length <= 10;
  };
  const descOK = (v = "") => {
    const n = v.trim();
    return n.length >= 10 && n.length <= 100;
  };
  const priceOK = (v = "") => /^\d+$/.test(String(v).trim()); // 정수만
  const tagOK = (v = "") => {
    const n = v.trim();
    return n.length >= 1 && n.length <= 5;
  };

  const messages = useMemo(
    () => ({
      name: "상품명: 1~10자",
      description: "상품 소개: 10~100자",
      price: "판매 가격: 숫자",
      tag: "태그는 1~5자",
      tagDup: "이미 추가된 태그입니다",
    }),
    []
  );

  return { nameOK, descOK, priceOK, tagOK, messages };
}

// 현재 폼 값으로 에러 맵을 계산
export function useValidate(values) {
  const { nameOK, descOK, priceOK, tagOK, messages } = useProductRules();
  const errors = {};

  if (!nameOK(values.name)) errors.name = messages.name;
  if (!descOK(values.description)) errors.description = messages.description;
  if (!priceOK(values.price)) errors.price = messages.price;
  if (values.tagInput && !tagOK(values.tagInput)) errors.tagInput = messages.tag;

  return { errors, isValid: Object.keys(errors).length === 0 };
}