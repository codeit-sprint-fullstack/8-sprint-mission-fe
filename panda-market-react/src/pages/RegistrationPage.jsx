import styles from '../styles/pages/RegistrationPage.module.css';
import { TextInput } from '../components/molecules/TextInput';
import { useEffect, useState } from 'react';
import { Textarea } from '../components/molecules/Textarea';
import { Tag } from '../components/atoms/Tag';

export function RegistrationPage() {
  const [productName, setProductName] = useState(''); // 상품명
  const [productDescription, setProductDescription] = useState(''); // 상품 설명
  const [productPrice, setProductPrice] = useState(''); // 판매가격
  const [tags, setTags] = useState(['test', 'test2', 'test3']); // 태그 리스트
  const [tag, setTag] = useState(''); // 태그 입력 값

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const handleChangeProductName = (e) => {
    setProductName(e.target.value);
    console.log('상품명: ' + productName);
  };

  const handleChangeProductDescription = (e) => {
    setProductDescription(e.target.value);
    console.log('상품 설명: ' + productDescription);
  };

  const handleChangeProductPrice = (e) => {
    setProductPrice(e.target.value);
    console.log('판매가격: ' + productPrice);
  };

  const handleChangeTag = (e) => {
    setTag(e.target.value);

    console.log(tag);
  };

  const handleAddTag = (e) => {
    if (tags.includes(tag) || tag === '') {
      console.log('이미 존재하는 태그이거나 태그를 입력해주세요.');
      return;
    }

    if (e.key === 'Enter' || e.key === ' ' || e.type === 'click') {
      setTags([...tags, tag]);
      setTag('');

      console.log(tags);
    }
  };

  const handleDeleteTag = (e) => {
    const targetName = e.target.parentElement.name;
    const filteredTags = tags.filter((v) => v !== targetName);

    setTags(filteredTags);
  };

  // 등록 폼 제출 이벤트
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productName, productDescription, productPrice, tags);
  };

  return (
    <main className={styles.registrationWrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.registrationTitle}>상품 등록</h1>
          <button type="submit" className="btn-small-40" disabled={false}>
            등록
          </button>
        </div>
        <div className={styles.registrationForm}>
          <TextInput
            label="상품명"
            name="productName"
            placeholder="상품명을 입력해주세요"
            value={productName}
            onChange={handleChangeProductName}
          />

          <Textarea
            label="상품 설명"
            name="productDescription"
            placeholder="상품 설명을 입력해주세요"
            value={productDescription}
            onChange={handleChangeProductDescription}
            resize={false}
          />

          <TextInput
            label="판매가격"
            name="productPrice"
            placeholder="판매가격을 입력해주세요"
            value={productPrice}
            onChange={handleChangeProductPrice}
          />

          <div className={styles.tagInputWrapper}>
            <TextInput
              label="태그"
              name="tag"
              placeholder="태그를 입력해주세요"
              value={tag}
              onChange={handleChangeTag}
              onKeyDown={handleAddTag}
            />

            <button onClick={handleAddTag} className="btn-small-40">
              태그 추가
            </button>

            <div className={styles.tagsWrapper}>
              {tags.map((tag) => (
                <Tag key={tag} label={tag} type="btn" onClick={handleDeleteTag} />
              ))}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
