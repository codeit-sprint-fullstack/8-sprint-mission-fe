'use client';

//라이브러리
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

//훅
import { getArticle, deleteArticle } from '@/api/ArticleService';
import { getArticleComments, createArticleComment } from '@/api/CommnetServices';
import { convertDateToKRString } from '@/utils/convertDate';

//컴포넌트
import MainFrame from '@/components/organisms/MainFrame';
import CommentForm from '@/components/features/comment/CommentForm';
import { DropdownButton } from '@/components/mocules/Dropdown';
import Button from '@/components/atoms/Button';

//이미지
import Image from 'next/image';
import userPanda from '@/images/ic_profile.svg';
import heartIcon from '@/images/ic_heart.svg';
import moreImg from '@/images/articles/detail/ic_more.svg';
import backIcon from '@/images/articles/detail/ic_back.svg';

//상수
import { ArticleResponse } from '@/constants/articleType';

export default function ArticleDetailPage({}) {
  return (
    <MainFrame>
      <div className="w-full h-fit my-[24px] mx-auto mb-[319px] px-[16px] py-0">
        <ArticleInfo />
        <CommentForm
          type="article"
          getComments={getArticleComments}
          createComment={createArticleComment}
        />
        <div className="flex flex-col items-center mt-[48px] mx-auto">
          <Button
            to="/articles"
            className="text-[16px] font-semibold rounded-full px-[33.5px] py-[14.5px]"
          >
            <p>목록으로 돌아가기</p>
            <Image src={backIcon} alt="back_button" />
          </Button>
        </div>
      </div>
    </MainFrame>
  );
}

function ArticleInfo({}) {
  const router = useRouter();
  const { id } = useParams();
  const [article, setArticle] = useState<ArticleResponse>({
    id: '',
    title: '',
    content: '',
    favoriteCount: 0,
    userId: '',
    userName: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    const handleLoad = async () => {
      if (typeof id === 'string') {
        setArticle(await getArticle(id));
      }
    };
    handleLoad();
  }, []);

  const handleDeleteArticle = () => {
    if (typeof id === 'string') {
      //(수정필요) -삭제 성공 여부 판단 필요
      deleteArticle(id);
      router.push('/articles');
    }
  };

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="w-full h-fit flex flex-col border-b-1 border-[var(--Cool-Gray-200)]">
        <div className="w-full flex justify-between">
          <p className="text-[20px] font-[700]">{article.title}</p>
          <DropdownButton
            list={[
              {
                name: '수정하기',
                onClick: () => {
                  router.push(`/articles/${id}/edit`);
                },
              },
              {
                name: '삭제하기',
                onClick: () => {
                  handleDeleteArticle();
                },
              },
            ]}
          >
            <Image src={moreImg} alt="more_button_icon" />
          </DropdownButton>
        </div>
        <div className="w-full h-fit flex justify-start items-center">
          {/* pr-[16px]도 안들어가요 */}
          <div className="flex gap-[16px] pr-[16px] py-[16px]">
            <Image src={userPanda} alt="profile_image" className="w-[40px] h-[40px]" />
            <div className="flex items-center gap-[8px]">
              <p className="text-[var(--Cool-Gray-600)] text-[14px] font-medium">
                {article.userName}
              </p>
              <p className="text-[var(--Cool-Gray-400)] text-[14px] font-normal">
                {convertDateToKRString(article.createdAt)}
              </p>
            </div>
          </div>
          {/* divide를 넣고 싶은데 안들어가요 tailwind */}
          <div className="flex pl-[16px] py-[16px]">
            <button
              //onClick={handleFavoriteClick}
              className="w-fit h-[40px] px-[12px] py-[4px] flex items-center gap-[4px] rounded-[35px] border border-[var(--Cool-Gray-200)]"
            >
              <Image src={heartIcon} alt="favoriteIcon" className="w-[32px] h-[32px]" />
              <p className="text-[var(--Cool-Gray-500)] text-[16px] font-medium">
                {article.favoriteCount}
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="text-[var(--Cool-Gary-800)] text-[18px] font-normal mt-[24px] mb-[36px]">
        <p>{article.content}</p>
      </div>
    </div>
  );
}
