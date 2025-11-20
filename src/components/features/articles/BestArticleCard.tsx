import Link from 'next/link';
import Image from 'next/image';
import { convertTz } from '@/libs/day';

const BestArticleCard = ({
  id = '',
  rank = 0,
  title = '',
  like = 0,
  date = '',
}: {
  id: string;
  rank: number;
  title: string;
  like: number;
  date: string;
}) => {
  return (
    <Link
      href={`/article/${id}`}
      className="bg-coolGray-50 flex w-full flex-col items-start rounded-[8px] px-6"
    >
      <div className="bg-primary-100 flex items-center justify-center gap-[10px] rounded-b-[8px] px-[24px] py-[2px]">
        <Image src="/icons/ic_medal.svg" alt="ic_medal" width={16} height={16} />
        <div className="text-base leading-[26px] font-semibold text-white">{`Best ${rank}`}</div>
      </div>
      <div className="flex w-full items-start justify-between pt-4 pb-[26px]">
        <div className="text-secondary-800 text-xl leading-[32px] font-semibold">{title}</div>
        <Image src="/articleImg.svg" alt="articleImg" width={72} height={72} />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-secondary-600 text-sm leading-[24px] font-normal">총명한판다</div>
          <div className="flex items-center gap-1">
            <Image src="/icons/ic_heart.svg" alt="ic_heart" width={16} height={16} />
            <div className="text-secondary-500 text-sm leading-[24px] font-normal">{like}</div>
          </div>
        </div>
        <div className="text-secondary-400 text-sm leading-[24px] font-normal">
          {convertTz(date)}
        </div>
      </div>
    </Link>
  );
};

export default BestArticleCard;
