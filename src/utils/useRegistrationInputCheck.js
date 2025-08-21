import { useState } from 'react';

export function useRegistrationInputCheck() {
  const [errors, setErrors] = useState({});

  const checkProductName = (name) => {
    const trimmed = String(name || '').trim();
    if (trimmed === '' || trimmed.length === 0) {
      setErrors((prev) => ({ ...prev, productName: '10자 이내로 입력해주세요' }));
      return false;
    }
    if (trimmed.length > 10) {
      setErrors((prev) => ({ ...prev, productName: '10자 이내로 입력해주세요' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, productName: '' }));
    return true;
  };

  const checkProductDescription = (description) => {
    const txt = String(description || '').trim();
    if (txt.length < 10) {
      setErrors((prev) => ({ ...prev, productDescription: '10자 이상 입력해주세요' }));
      return false;
    }
    if (txt.length >= 100) {
      setErrors((prev) => ({ ...prev, productDescription: '100자 이내로 입력해주세요' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, productDescription: '' }));
    return true;
  };

  const checkProductPrice = (price) => {
    const val = String(price || '').trim();
    if (val === '') {
      setErrors((prev) => ({ ...prev, productPrice: '숫자로 입력해주세요' }));
      return false;
    }
    // allow integers or decimal numbers, but ensure it's a valid number
    const num = Number(val);
    if (Number.isNaN(num)) {
      setErrors((prev) => ({ ...prev, productPrice: '숫자로 입력해주세요' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, productPrice: '' }));
    return true;
  };

  const checkTag = (tag) => {
    const txt = String(tag || '').trim();
    if (txt === '') {
      return false;
    }
    if (txt.length > 5) {
      setErrors((prev) => ({ ...prev, tag: '5글자 이내로 입력해주세요' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, tag: '' }));
    return true;
  };

  return {
    errors,
    checkProductName,
    checkProductDescription,
    checkProductPrice,
    checkTag,
  };
}
