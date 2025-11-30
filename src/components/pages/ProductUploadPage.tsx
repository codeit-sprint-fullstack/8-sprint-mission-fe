'use client';
//라이브러리
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

//훅
import useProduct from '@/hooks/registerFormHooks/useProduct';

//컴포넌트
import MainFrame from '../organisms/MainFrame';
import Input from '../mocules/Input';
import TextArea from '../mocules/TextArea';
import Button from '../atoms/Button';

//이미지
import Image from 'next/image';
import cancleTagImg from '@/images/input/cancle_tag.svg';

interface SelectedTagProps {
  tags: string[];
  handleDelete: (tag: string) => void;
}

function SelectedTags({ tags, handleDelete }: SelectedTagProps) {
  return (
    <div className="flex flex-wrap gap-[12px]">
      {tags.map((tag) => {
        return (
          <div
            key={tags.indexOf(tag)}
            className="h-[36px] pt-[6px] pr-[12px] pb-[6px] pl-[16px] flex items-center justify-center gap-[10px] rounded-[26px] bg-[var(--Cool-Gray-100,#f3f4f6)]"
          >
            <p className="font-normal text-base">{'#' + tag}</p>
            <button onClick={() => handleDelete(tag)}>
              <Image src={cancleTagImg} alt="cancelTag" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function ProductUpload({}) {
  //입력값, 유효성 검사, 입력값을 다루는 함수 묶어서 커스텀 훅으로 만들었습니다.
  //유효성 검사 커스텀 훅(요구사항)은 이 커스텀 훅 안에 있습니다.
  const {
    values, //입력값
    errors, //유효성 메세지
    isSubmitActive, //등록 버튼 활성화 여부
    onChange, //입력폼 onChange
    onFileChange, //파일 업로드
    addTag, //태그 추가
    deleteTag, //태그 삭제
    register,
  } = useProduct();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      addTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await register();
    if (res) {
      router.push(`/items/${res.id}`);
    }
  };

  return (
    <MainFrame HasNav={true}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[1200px] font-bold mt-[26px] mb-[162px] mx-auto px-[16px]"
      >
        <div className="flex justify-between items-center mb-[26px]">
          <h1>상품 등록하기</h1>
          <Button
            disabled={!isSubmitActive}
            className="w-fit h-fit px-[23px] py-[12px] flex gap-[10px] rounded-[8px] text-[16px] font-semibold"
          >
            등록
          </Button>
        </div>
        <div className="flex flex-col">
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
          <TextArea
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
    </MainFrame>
  );
}
