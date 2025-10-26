'use client';
//라이브러리
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

//훅
import useProduct from '@/hooks/useProduct.js';

//컴포넌트
import HomeHeader from '@/components/molecules/Header/HomeHeader.jsx';
import HomeFooter from '@/components/molecules/Footer/HomeFooter.jsx';
import Input from '@/components/molecules/Input/Input';
import Button from '@/components/Atoms/Button/Button';

//스타일
import styles from './ProductForm.module.css';

//이미지
import Image from 'next/image';
import cancleTagImg from './cancle_tag.svg';

function SelectedTags({ tags, handleDelete }) {
  return (
    <div className={styles.selectedTags}>
      {tags.map((tag) => {
        return (
          <div className={styles.selectedTag} key={tags.indexOf(tag)}>
            <p>{'#' + tag}</p>
            <button className={styles.cancleBtn} onClick={() => handleDelete(tag)}>
              <Image src={cancleTagImg} alt="cancelTag" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function ProductForm({}) {
  //입력값, 유효성 검사, 입력값을 다루는 함수 묶어서 커스텀 훅으로 만들었습니다.
  //유효성 검사 커스텀 훅(요구사항)은 이 커스텀 훅 안에 있습니다.
  const [
    values, //입력값
    errors, //유효성 메세지
    isSubmitActive, //등록 버튼 활성화 여부
    onChange, //입력폼 onChange
    onFileChange, //파일 업로드
    addTag, //태그 추가
    deleteTag, //태그 삭제
    register,
  ] = useProduct();

  const fileInputRef = useRef();

  const router = useRouter();

  const handleKeyDown = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      addTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register();
    if (res) {
      router.push(`/items/${res.id}`);
    }
  };

  //이번에 배운 사실: 리액트 JSX는 객체를 {}표현식에 넣어도 그대로 출력할 수 없다.
  return (
    <>
      <HomeHeader isHome={true} />
      <main className={`with-header ${styles.main}`}>
        <form className={styles.wrapper} onSubmit={handleSubmit}>
          <div className={styles.headline}>
            <h1>상품 등록하기</h1>
            <Button className={styles.button} disabled={!isSubmitActive}>
              등록
            </Button>
          </div>
          <div className={styles.inputDiv}>
            <Input
              type="file"
              label="상품 이미지"
              name="files"
              ref={fileInputRef}
              onChange={onFileChange}
              files={values.files}
            />
            <Input
              label="상품명"
              name="name"
              value={values.name}
              error={errors.name}
              onChange={onChange}
              placeholder="상품명을 입력해 주세요."
            />
            <Input
              label="상품 소개"
              name="description"
              value={values.description}
              error={errors.description}
              onChange={onChange}
              rows={10}
              placeholder="상품소개를 입력해 주세요."
            />
            <Input
              label="판매 가격"
              name="price"
              value={values.price}
              onChange={onChange}
              placeholder="판매 가격을 입력해 주세요."
              error={errors.price}
            />
            <Input
              label="태그"
              name="tag"
              value={values.tag}
              error={errors.tag}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              placeholder="태그를 입력해 주세요."
            />
            <SelectedTags tags={values.tags} handleDelete={deleteTag} />
          </div>
        </form>
      </main>
      <HomeFooter />
    </>
  );
}
