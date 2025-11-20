'use client';

import clsx from 'clsx';
import Image from 'next/image';

const SearchInput = ({
  value,
  setValue,
  size = 'sm',
}: {
  value: string;
  setValue: (value: string) => void;
  size: 'sm' | 'lg';
}) => {
  const sizeClassMap = {
    sm: 'w-[325px] h-[42px]',
    lg: 'w-[1054px] h-[42px]',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setValue(searchValue);
  };

  return (
    <div
      className={clsx(
        sizeClassMap[size],
        'bg-secondary-100 flex items-center justify-start gap-1 rounded-[12px] py-[9px] pr-5 pl-4',
      )}
    >
      <Image src="/icons/ic_search.svg" alt="ic_search" width={24} height={24} />
      <input
        className="text-secondary-400 w-full border-none text-base leading-[26px] font-normal outline-none"
        type="text"
        placeholder="검색어를 입력해주세요."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
