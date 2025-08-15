import styles from '../styles/pages/RegistrationPage.module.css';
import { TextInput } from '../components/molecules/TextInput';
import { useState } from 'react';
import { Textarea } from '../components/molecules/Textarea';
import { Tag } from '../components/atoms/Tag';
import { useRegistrationFormValidation } from '../lib/hooks/useRegistrationFormValidation';
import { REGISTRATION_ERROR_MESSAGES } from '../lib/constants/errorMessages';

export function RegistrationPage() {
  const [tag, setTag] = useState(''); // 태그 입력 값
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    tags: ['test', 'test2', 'test3'],
  });

  const { isValid, isDisabled } = useRegistrationFormValidation({ formData, tag });
  function getErrorMessage(errorType) {
    return REGISTRATION_ERROR_MESSAGES[errorType];
  }

  const handleChangeProductName = (e) => {
    setFormData((prev) => ({ ...prev, productName: e.target.value }));
    console.log('상품명: ' + formData.productName);
  };

  const handleChangeProductDescription = (e) => {
    setFormData((prev) => ({ ...prev, productDescription: e.target.value }));
    console.log('상품 설명: ' + formData.productDescription);
  };

  const handleChangeProductPrice = (e) => {
    setFormData((prev) => ({ ...prev, productPrice: e.target.value }));
    console.log('판매가격: ' + formData.productPrice);
  };

  // 태그 입력 인풋
  const handleChangeTag = (e) => {
    setTag(e.target.value);

    console.log(tag);
  };

  // 태그 추가 함수
  const handleAddTag = (e) => {
    const trimmedTag = tag.trim();

    if (e.key === 'Enter' || e.key === ' ' || e.type === 'click') {
      if (formData.tags.includes(trimmedTag) || !trimmedTag || trimmedTag.length > 5) {
        console.log('이미 존재하는 태그이거나 태그를 입력해주세요.');
        return; // 이미 존재하는 태그이거나 빈값이거나 5글자 초과일 때 함수 종료
      }

      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setTag('');

      console.log(formData.tags);
    }
  };

  // 태그 삭제 함수
  const handleDeleteTag = (e) => {
    const targetName = e.target.parentElement.name;
    const filteredTags = formData.tags.filter((v) => v !== targetName);

    setFormData({ ...formData, tags: filteredTags });
  };

  // 등록 폼 제출 이벤트
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main className={styles.registrationWrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.registrationTitle}>상품 등록</h1>
          <button type="submit" className="btn-small-40" disabled={isDisabled}>
            등록
          </button>
        </div>
        <div className={styles.registrationForm}>
          <TextInput
            label="상품명"
            name="productName"
            placeholder="상품명을 입력해주세요"
            value={formData.productName}
            onChange={handleChangeProductName}
            isValid={isValid.productName.isValid}
            errorMessage={getErrorMessage(isValid.productName.errorType)}
          />

          <Textarea
            label="상품 설명"
            name="productDescription"
            placeholder="상품 설명을 입력해주세요"
            value={formData.productDescription}
            onChange={handleChangeProductDescription}
            resize={false}
            isValid={isValid.productDescription.isValid}
            errorMessage={getErrorMessage(isValid.productDescription.errorType)}
          />

          <TextInput
            label="판매가격"
            name="productPrice"
            placeholder="판매가격을 입력해주세요"
            value={formData.productPrice}
            onChange={handleChangeProductPrice}
            isValid={isValid.productPrice.isValid}
            errorMessage={getErrorMessage(isValid.productPrice.errorType)}
          />

          <div className={styles.tagInputWrapper}>
            <TextInput
              label="태그"
              name="tag"
              placeholder="태그를 입력해주세요"
              value={tag}
              onChange={handleChangeTag}
              onKeyDown={handleAddTag}
              isValid={isValid.tag.isValid}
              errorMessage={getErrorMessage(isValid.tag.errorType)}
            />

            <button onClick={handleAddTag} className="btn-small-40">
              태그 추가
            </button>

            <div className={styles.tagsWrapper}>
              {formData.tags.map((tag) => (
                <Tag key={tag} label={tag} type="btn" onClick={handleDeleteTag} />
              ))}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
