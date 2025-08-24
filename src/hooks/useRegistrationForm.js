import { useState, useEffect } from "react";

export default function useRegistrationForm() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [focused, setFocused] = useState({
    productName: false,
    productDescription: false,
    price: false,
    tagInput: false,
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && trimmedTag.length <= 5) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const validate = () => {
    const newErrors = {};

    // 상품명: 1~10자
    if (focused.productName && (productName.length < 1 || productName.length > 10)) {
      if (productName.length < 1) newErrors.productName = "1자 이상 입력해주세요";
      else if (productName.length > 10) newErrors.productName = "10자 이내로 입력해주세요";
    }

    // 상품 소개: 10~100자
    if (
      focused.productDescription &&
      (productDescription.length < 10 || productDescription.length > 100)
    ) {
      if (productDescription.length < 10)
        newErrors.productDescription = "10자 이상 입력해주세요";
      else if (productDescription.length > 100)
        newErrors.productDescription = "100자 이내로 입력해주세요";
    }

    // 판매 가격: 숫자만
    if (focused.price && !/^\d+$/.test(price)) {
      newErrors.price = "숫자로 입력해주세요";
    }

    // 태그: 5자 이내
    if (focused.tagInput && tagInput.length > 5) {
      newErrors.tagInput = "5글자 이내로 입력해주세요";
    }

    setErrors(newErrors);

    // 모든 필드 유효하면 isValid true
    setIsValid(
      Object.keys(newErrors).length === 0 &&
        productName &&
        productDescription &&
        price
    );
  };

  useEffect(() => {
    validate();
  }, [productName, productDescription, price, tagInput, focused]);

  return {
    productName,
    setProductName,
    productDescription,
    setProductDescription,
    price,
    setPrice,
    tags,
    tagInput,
    setTagInput,
    handleAddTag,
    handleRemoveTag,
    errors,
    isValid,
    handleFocus,
  };
}
