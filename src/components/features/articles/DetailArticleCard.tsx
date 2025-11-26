import { useGetDetailArticle } from '@/hooks/queries/useArticleQueries';
import DropDown from '@/components/common/DropDown';
import Image from 'next/image';
import { convertTz } from '@/libs/day';
import HeartTag from '../../common/HeartTag';
import { useRouter } from 'next/navigation';

const DetailArticleCard = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data: article } = useGetDetailArticle(id);

  const handleEdit = () => {
    router.push(`/articles/edit/${id}`);
  };

  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="text-secondary-800 text-xl leading-[32px] font-bold">
            {article?.data?.title}
          </div>
          <DropDown
            type="modify"
            handlers={{ edit: handleEdit, delete: handleDelete }}
            selected={''}
            onChange={() => {}}
          />
        </div>
        <div className="flex items-center gap-8 py-4">
          <div className="flex items-center gap-4">
            <Image src="/icons/ic_profile.svg" alt="ic_profile" width={40} height={40} />
            <div className="flex items-center gap-2">
              <div className="text-secondary-600 text-sm leading-[24px] font-medium">
                총명한판다
              </div>
              <div className="text-secondary-400 text-sm leading-[24px] font-normal">
                {convertTz(article?.data?.createdAt)}
              </div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="34"
            viewBox="0 0 2 34"
            fill="none"
          >
            <path d="M1 0V34" stroke="#E5E7EB" />
          </svg>
          <HeartTag like={article?.data?.likeCount || 0} />
        </div>
      </div>
      <div className="text-secondary-800 text-lg leading-[26px] font-normal">
        {article?.data?.content}
      </div>
    </div>
  );
};

export default DetailArticleCard;
