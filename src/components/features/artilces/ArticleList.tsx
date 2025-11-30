import Link from 'next/link';
import { ArticleResponse } from '@/constants/articleType';
import { convertDateToKRString } from '@/utils/convertDate';

import Image from 'next/image';
import heartIcon from '@/images/ic_heart.svg';
import userProfilePanda from '@/images/ic_profile.svg';
import bestIcon from '@/images/articles/bestIcon.svg';
import productDefault from '@/images/products/product_default.png';
import { useDeviceProvider } from '@/components/provider/DevicePorvider';

interface ArticleDataProp {
  data: ArticleResponse;
}

function Article({ data }: ArticleDataProp) {
  const { title, userName, createdAt, favoriteCount } = data;

  return (
    <div className="w-full flex flex-col gap-[16px] bg-[#fcfcfc] pb-[24px]">
      <div className="w-full flex flex-between">
        <p className="w-full flex justify-start items-start text-[var(--Cool-Gray-800)] text-[20px] font-semibold">
          {title}
        </p>
        <div className="w-[72px] h-[72px] rounded-[8px] border-2 border-[var(--Cool-Gray-100)] flex-shrink-0">
          <Image src={productDefault} alt="mainImg" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row justify-between items-center gap-[8px]">
          <Image className="w-[24px] h-[24px]" src={userProfilePanda} alt="userIcon" />
          <p className="text-[var(--Cool-Gray-600)] text-[14px] font-normal whitespace-nowrap flex-shrink-0">
            {userName}
          </p>
          <p className="w-fit flex items-center text-[var(--Cool-Gray-400)] text-[14px] font-normal">
            {convertDateToKRString(createdAt)}
          </p>
        </div>
        <div className="flex w-fit h-fit gap-[8px] pr-[4px]">
          <Image src={heartIcon} alt="heartIcon" className="w-[24px] h-[24px]" />
          <p className="text-[var(--Cool-Gray-500)] text-[16px] font-normal">
            {favoriteCount > 9999 ? '9999+' : favoriteCount}
          </p>
        </div>
      </div>
      {/* <div className={article_st.divider}></div> */}
    </div>
  );
}

function BestArticle({ data }: ArticleDataProp) {
  const { title, userName, createdAt, favoriteCount } = data;

  return (
    <div className="h-full flex flex-col justify-between gap-[24px] bg-[var(--Cool-Gray-50)] px-[24px] pb-[10px] rounded-[8px]">
      <div className="flex flex-col gap-[16px]">
        <div className="flex w-[102px] h-[30px] px-[24px] py-[2px] flex-row justify-center items-center gap-[4px] rounded-b-[16px] bg-[var(--brand-blue)]">
          <Image src={bestIcon} alt="bestIcon" />
          <p className="text-white text-[16px] font-semibold">Best</p>
        </div>
        <div className="w-full flex flex-between">
          <p className="w-full flex justify-start items-start text-[var(--Cool-Gray-800)] text-[20px] font-semibold">
            {title}
          </p>
          <div className="w-[72px] h-[72px] rounded-[8px] border-2 border-[var(--Cool-Gray-100)] flex-shrink-0">
            <Image src={productDefault} alt="mainImg" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row justify-between items-center gap-[8px]">
          <p className="text-[var(--Cool-Gray-600)] text-[14px] font-normal whitespace-nowrap flex-shrink-0">
            {userName}
          </p>
          <div className="flex w-fit h-fit gap-[4px]">
            <Image src={heartIcon} alt="heartIcon" className="w-[24px] h-[24px]" />
            <p className="text-[var(--Cool-Gray-500)] text-[16px] font-normal">
              {favoriteCount > 9999 ? '9999+' : favoriteCount}
            </p>
          </div>
        </div>
        <p className="w-fit flex items-center text-[var(--Cool-Gray-400)] text-[14px] font-normal">
          {convertDateToKRString(createdAt)}
        </p>
      </div>
    </div>
  );
}

interface ArticleListProps {
  articles?: ArticleResponse[];
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <ul className="w-full h-[600px] flex flex-col gap-[24px] overflow-scroll scrollbar-hide">
      {articles &&
        articles.map((data) => (
          <li key={data.id}>
            <Link href={`/articles/${data.id}`}>
              <Article data={data} />
            </Link>
          </li>
        ))}
    </ul>
  );
}

export function BestArticleList({ articles }: ArticleListProps) {
  const deviceType = useDeviceProvider();
  const girdSize = {
    desktop: 'grid-cols-3',
    tablet: 'grid-cols-2',
    mobile: 'grid-cols-1',
  };

  const itemSize = {
    desktop: 3,
    tablet: 2,
    mobile: 1,
  };

  return (
    <ul className={`w-full grid gap-[24px] ${girdSize[deviceType]}`}>
      {articles &&
        articles.map((data, idx) => (
          <li key={idx} className={idx < itemSize[deviceType] ? '' : 'hidden'}>
            <Link href={`/articles/${data.id}`}>
              <BestArticle data={data} />
            </Link>
          </li>
        ))}
    </ul>
  );
}
