import React, { useState } from 'react';
import { useRegistrationInputCheck } from '../../utils/useRegistrationInputCheck';
import axios from 'axios';
import RegistrationInput from './RegistrationInput';
import RegistrationTagSection from './RegistrationTagSection';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [tags, setTags] = useState(['티셔츠', '상의']);
  const { errors, checkProductName, checkProductDescription, checkProductPrice, checkTag } = useRegistrationInputCheck();
  const registerProduct = async (productData) => {
    try {
      const response = await axios.post(
        'https://pandamarket-db.onrender.com/products',
        productData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleTagAdd = (newTag) => {
    const trimmed = String(newTag || '').trim();
    if (!checkTag(trimmed)) return;
    if (!tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
  };

  const handleTagRemove = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleRegister = async () => {
    const validName = checkProductName(productName);
    const validDesc = checkProductDescription(productDescription);
    const validPrice = checkProductPrice(productPrice);
    let validTags = true;
    for (const t of tags) {
      if (!checkTag(t)) {
        validTags = false;
        break;
      }
    }

    if (!validName || !validDesc || !validPrice || !validTags) {
      alert('입력값을 확인해주세요.');
      return;
    }

    const productData = {
      name: productName,
      description: productDescription,
      price: Number(productPrice),
      tags: tags,
    };
    try {
      await registerProduct(productData);
      alert('상품이 등록되었습니다!');
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setTags([]);
    } catch (error) {
      if (error.response) {
        alert('서버 응답 에러: ' + error.response.data.message);
      } else if (error.request) {
        alert('서버에 연결할 수 없습니다.');
      } else {
        alert('오류: ' + error.message);
      }
    }
  };

  const isFormValid = productName && productDescription && productPrice &&
    !errors.productName && !errors.productDescription && !errors.productPrice;

  return (
    <div className={styles.productForm}>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>상품 등록하기</h1>
        <button
          onClick={handleRegister}
          className={isFormValid ? `${styles.registerBtn} ${styles.active}` : styles.registerBtn}
          disabled={!isFormValid}
        >
          등록
        </button>
      </div>

      <div className={styles.formContent}>
        <RegistrationInput
          label="상품명"
          placeholder="상품명을 입력해주세요"
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
            checkProductName(e.target.value);
          }}
          error={errors.productName}
        />

        <RegistrationInput
          label="상품 소개"
          placeholder="상품 소개를 입력해주세요"
          value={productDescription}
          onChange={(e) => {
            setProductDescription(e.target.value);
            checkProductDescription(e.target.value);
          }}
          multiline={true}
          rows={8}
          error={errors.productDescription}
        />

        <RegistrationInput
          label="판매가격"
          placeholder="판매 가격을 입력해주세요"
          value={productPrice}
          onChange={(e) => {
            setProductPrice(e.target.value);
            checkProductPrice(e.target.value);
          }}
          error={errors.productPrice}
        />

        <RegistrationTagSection
          label="태그"
          tags={tags}
          onTagAdd={handleTagAdd}
          onTagRemove={handleTagRemove}
          placeholder="태그를 입력해주세요"
          error={errors.tag}
        />
      </div>
    </div>
  );
};

export default RegistrationForm;