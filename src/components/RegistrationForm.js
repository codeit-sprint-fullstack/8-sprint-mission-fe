import React, { useState } from 'react';
import axios from 'axios';
import RegistrationInput from './RegistrationInput';
import RegistrationTagSection from './RegistrationTagSection';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [tags, setTags] = useState(['티셔츠', '상의']);
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
    if (!tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  };

  const handleTagRemove = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleRegister = async () => {
    const productData = {
      name: productName,
      description: productDescription,
      price: productPrice,
      tags: tags,
    };
    try {
      await registerProduct(productData);
      alert('상품이 등록되었습니다!');
      // 필요하다면 폼 초기화 등 추가
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

  return (
    <div className={styles.productForm}>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>상품 등록하기</h1>
        <button
          onClick={handleRegister}
          className={styles.registerBtn}
        >
          등록
        </button>
      </div>

      <div className={styles.formContent}>
        <RegistrationInput
          label="상품명"
          placeholder="상품명을 입력해주세요"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <RegistrationInput
          label="상품 소개"
          placeholder="상품 소개를 입력해주세요"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          multiline={true}
          rows={8}
        />

        <RegistrationInput
          label="판매가격"
          placeholder="판매 가격을 입력해주세요"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />

        <RegistrationTagSection
          label="태그"
          tags={tags}
          onTagAdd={handleTagAdd}
          onTagRemove={handleTagRemove}
          placeholder="태그를 입력해주세요"
        />
      </div>
    </div>
  );
};

export default RegistrationForm;