import { useEffect, useState } from 'react';

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

  useEffect(() => {
    /**
     * 등록 버튼 비활성화 여부 체크
     */
    const isFormValid =
      formData.productName !== '' && // 상품명 입력 여부
      formData.productDescription !== '' && // 상품 설명 입력 여부
      formData.productPrice !== '' && // 판매가격 입력 여부
      formData.tags.length > 0; // 태그 입력 여부

    setIsDisabled(!isFormValid);

    /**
     * 각 인풋 유효성 체크
     */
    // 상품명 유효성 검사
    const validateProductName = (name) => {
      const isInvalid = name.length > 10 && name !== '';
      return {
        isValid: isInvalid,
        errorType: isInvalid ? 'length' : '',
      };
    };

    // 상품 설명 유효성 검사
    const validateProductDescription = (desc) => {
      const isTooShort = desc !== '' && desc.length < 10;
      const isTooLong = desc.length > 100;
      return {
        isValid: isTooShort || isTooLong,
        errorType: isTooShort ? 'minLength' : isTooLong ? 'maxLength' : '',
      };
    };

    // 가격 유효성 검사
    const validatePrice = (price) => {
      const isInvalid = !price.match(/^\d+$/) && price !== '';
      return {
        isValid: isInvalid,
        errorType: isInvalid ? 'price' : '',
      };
    };

    // 태그 유효성 검사
    const validateTag = (tag) => {
      const isInvalid = tag.length > 5;
      const isExist = formData.tags.includes(tag);
      return {
        isValid: isInvalid || isExist,
        errorType: isInvalid ? 'tag' : isExist ? 'tagExist' : '',
      };
    };

    setIsValid((prev) => ({
      ...prev,
      productName: validateProductName(formData.productName),
      productDescription: validateProductDescription(formData.productDescription),
      productPrice: validatePrice(formData.productPrice),
      tag: validateTag(tag),
    }));
  }, [formData, tag]);

  return { isValid, isDisabled };
}
