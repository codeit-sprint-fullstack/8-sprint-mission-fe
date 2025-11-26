import Link from 'next/link';
import Image from 'next/image';

const ArticleList = ({
  id = '',
  title = '',
  nickname,
  like = 0,
  date = '',
}: {
  id: string;
  title: string;
  nickname?: string;
  like: number;
  date: string;
}) => {
  return (
    <Link
      href={`/articles/${id}`}
      className="bg-background-gray flex w-[1200px] flex-col items-start gap-4 px-2 pb-6"
    >
      <div className="flex w-full justify-between">
        <div className="text-coolGray-800 text-xl leading-[32px] font-semibold">{title}</div>
        <Image src="/articleImg.svg" alt="articleImg" width={72} height={72} />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/icons/ic_profile.svg" alt="ic_profile" width={24} height={24} />
          <div className="text-secondary-600 text-sm leading-[24px] font-normal">
            {nickname ?? '총명한판다'}
          </div>
          <div className="text-secondary-400 text-sm leading-[24px] font-normal">{date}</div>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/icons/ic_heart.svg" alt="ic_heart" width={24} height={24} />
          <div className="text-secondary-500 text-base leading-[26px] font-normal">{like}</div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleList;
