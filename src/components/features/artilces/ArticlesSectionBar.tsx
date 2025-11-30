import { DropdownOldSelect } from '@/components/mocules/Dropdown';
import Button from '@/components/atoms/Button';

//이미지
import Image from 'next/image';
import searchIcon from '@/images/searchbar/ic_search.svg';

interface SearchBar {
  title: string;
  order: string;
  search: string;
  onChangeOrder: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  registerName?: string;
  registerUrl?: string;
}

export default function ArticlesSectionBar({
  title = '',
  order = '',
  search = '',
  onChangeOrder,
  onChangeSearch,
  registerName,
  registerUrl,
}: SearchBar) {
  return (
    <div className="flex h-fit w-full flex-col items-start justify-center gap-[8px]">
      <div className="h-[42px] w-full flex justify-between gap-[12px] items-center">
        <p className="text-[var(--Cool-Gray-900)] text-xl font-bold flex items-center shrink-0">
          {title}
        </p>
        <Button
          to={registerUrl}
          className="h-[42px] whitespace-nowrap w-fit shrink-0 rounded-[8px] px-[23px] py-[10px] text-[16px] font-semibold"
        >
          {registerName}
        </Button>
      </div>
      <div className="w-full flex gap-[12px]">
        <div className="relative h-[42px] w-full flex items-center">
          <input
            name="search-input"
            placeholder="검색할 게시글을 입력해주세요"
            value={search}
            onChange={onChangeSearch}
            className="flex w-full h-full px-[20px] py-[9px] pl-[44px] flex-col items-start gap-[10px] rounded-[12px] border-0 bg-[var(--Cool-Gray-100,#f3f4f6)] flex-shrink-0"
          />
          <Image
            src={searchIcon}
            alt="searchIcon"
            className="absolute w-[24px] h-[24px] left-[16px]"
          />
        </div>
        <DropdownOldSelect order={order} onChangeOrder={onChangeOrder} />
      </div>
    </div>
  );
}
