import { useEffect, useState } from 'react';
import {
  validateProductName,
  validateProductDescription,
  validatePrice,
  validateTag,
} from '../utils/validator';

export function useRegistrationFormValidation({ formData, tag }) {
  const [isDisabled, setIsDisabled] = useState(false); // 등록 버튼 비활성화 여부
  const [isValid, setIsValid] = useState({
    productName: {
      isValid: false,
      errorType: '',
    },
    productDescription: {
      isValid: false,
      errorType: '',
    },
    productPrice: {
      isValid: false,
      errorType: '',
    },
    tag: {
      isValid: false,
      errorType: '',
    },
  });

  // 유효성 검사 로직을 별도의 useEffect로 분리
  useEffect(() => {
    /**
     * 각 인풋 유효성 체크
     */
    setIsValid((prev) => ({
      ...prev,
      productName: validateProductName(formData.productName),
      productDescription: validateProductDescription(formData.productDescription),
      productPrice: validatePrice(formData.productPrice),
      tag: validateTag(tag, formData),
    }));
  }, [formData, tag]);

  // 버튼 비활성화 상태 관리를 위한 별도의 useEffect
  useEffect(() => {
    const isFormValid =
      formData.productName !== '' && // 상품명 입력 여부
      formData.productDescription !== '' && // 상품 설명 입력 여부
      formData.productPrice !== '' && // 판매가격 입력 여부
      formData.tags.length > 0; // 태그 입력 여부

    const hasError = Object.values(isValid).some((v) => v.isValid); // 유효성 검사에 실패한 항목이 하나라도 있으면 true를 반환
    setIsDisabled(!(isFormValid && !hasError));
  }, [formData, isValid]); // isValid 변경시에도 버튼 상태 업데이트

  return { isValid, isDisabled };
}
