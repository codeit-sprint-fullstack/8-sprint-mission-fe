'use client';

//컴포넌트
import MainFrame from '@/components/organisms/MainFrame';
import Button from '@/components/atoms/Button';
import Input from '@/components/mocules/Input';
import TextArea from '@/components/mocules/TextArea';
import useArticle from '@/hooks/registerFormHooks/useArticle';

export default function ArticleUpload({ mode = 'create' }) {
  //입력값, 유효성 검사, 입력값을 다루는 함수 묶어서 커스텀 훅으로 만들었습니다.
  //유효성 검사 커스텀 훅(요구사항)은 이 커스텀 훅 안에 있습니다.
  const {
    values, //입력값
    errors, //유효성 메세지
    isSubmitActive, //등록 버튼 활성화 여부
    onChange, //입력폼 onChange
    register,
  } = useArticle();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitActive) {
      if (mode === 'create') {
        register();
      } else {
      }
    }
  };

  //이번에 배운 사실: 리액트 JSX는 객체를 {}표현식에 넣어도 그대로 출력할 수 없다.
  return (
    <MainFrame>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[1200px] font-bold mt-[26px] mb-[162px] mx-auto px-[16px]"
      >
        <div className="flex justify-between items-center mb-[26px]">
          <h1>게시글 쓰기</h1>
          <Button
            disabled={!isSubmitActive}
            className="w-fit h-fit px-[23px] py-[12px] flex gap-[10px] rounded-[8px] text-[16px] font-semibold"
          >
            등록
          </Button>
        </div>
        <div className="flex flex-col">
          <Input
            label="제목"
            name="title"
            value={values.title}
            error={errors.title}
            onChange={onChange}
            placeholder="제목을 입력해 주세요."
          />
          <TextArea
            rows={10}
            label="내용"
            name="content"
            value={values.content}
            error={errors.content}
            onChange={onChange}
            placeholder="내용을 입력해 주세요."
          />
        </div>
      </form>
    </MainFrame>
  );
}
