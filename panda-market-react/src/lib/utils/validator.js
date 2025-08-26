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
const validateTag = (tag, formData) => {
  const isInvalid = tag.length > 5 && tag !== '';
  const isExist = formData.tags.includes(tag);
  return {
    isValid: isInvalid || isExist,
    errorType: isInvalid ? 'tag' : isExist ? 'tagExist' : '',
  };
};

export { validateProductName, validateProductDescription, validatePrice, validateTag };
