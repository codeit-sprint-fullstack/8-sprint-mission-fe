'use client';

import Button from '@/components/atoms/Button';
import { DropdownOldSelect } from '@/components/mocules/Dropdown';

import Image from 'next/image';
import searchIcon from '@/images/searchbar/ic_search.svg';

interface NoSearchBar {
  title: string;
  order?: string;
  search?: string;
  onChangeOrder?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  registerName?: string;
  registerUrl?: string;
}

interface SearchBar {
  title: string;
  order: string;
  search: string;
  onChangeOrder: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  registerName?: string;
  registerUrl?: string;
}

//검색 바를 사용하지 않아도 되지만, 사용한다면 반드시 모든 인자를 넣기
type ProductsSectionBarProps = SearchBar | NoSearchBar;

//나중에 검색 바를 컴포넌트 분리하기
export default function ProductsSectionBar({
  title = '',
  order = '',
  search = '',
  onChangeOrder,
  onChangeSearch,
  registerName,
  registerUrl,
}: ProductsSectionBarProps) {
  const isUseRegistBtn = registerName && registerUrl;
  return (
    <div className="h-fit w-full">
      {onChangeOrder && onChangeSearch ? (
        <div className="flex h-fit w-full flex-col items-start justify-center gap-[8px] md:mb-[20px] md:flex-row md:items-center md:justify-between md:gap-[12px]">
          <div className="shrink-0">
            <p className="text-[var(--Secondary-900)] text-xl font-bold">{title}</p>
            {isUseRegistBtn && (
              <Button
                to={registerUrl}
                className="block h-[42px] whitespace-nowrap w-fit shrink-0 rounded-[8px] px-[23px] py-[10px] text-[16px] font-semibold md:hidden"
              >
                {registerName}
              </Button>
            )}
          </div>
          <div className="w-full flex items-center gap-[12px] shrink-0 justify-between md:justify-center md:w-fit">
            <div className="relative flex h-[42px] w-full items-center md:max-w-[325px]">
              <Image
                src={searchIcon}
                className="absolute left-[16px] h-[24px] w-[24px]"
                alt="search_Icon"
              />
              <input
                className="flex h-full w-full flex-col items-start gap-[10px] rounded-[12px] border-0 bg-[var(--Secondary-100)] px-[20px] py-[9px] pl-[44px]"
                name="search-input"
                placeholder="검색할 상품을 입력해주세요"
                value={search}
                onChange={onChangeSearch}
              />
            </div>
            {isUseRegistBtn && (
              <Button
                to={registerUrl}
                className="hidden h-[42px] flex items-center whitespace-nowrap shrink-0 rounded-[8px] px-[23px] py-[10px] text-[16px] font-semibold md:block"
              >
                <p className="m-auto">{registerName}</p>
              </Button>
            )}
            <DropdownOldSelect order={order} onChangeOrder={onChangeOrder} />
          </div>
        </div>
      ) : (
        <p className="text-[var(--Secondary-900)] text-xl font-bold">{title}</p>
      )}
    </div>
  );
}
