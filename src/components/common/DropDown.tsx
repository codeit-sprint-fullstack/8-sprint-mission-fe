'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

const DropDown = ({
  type = 'sort',
  handlers = null,
  selected,
  onChange = () => {},
}: {
  type: 'sort' | 'modify';
  handlers: Record<string, () => void> | null;
  selected: string;
  onChange: (option: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortOptions = ['recent', 'like'] as const;
  const modifyOptions = ['edit', 'delete'] as const;

  type OptionKey = 'recent' | 'like' | 'edit' | 'delete';

  const labelMap: Record<OptionKey, string> = {
    recent: '최신순',
    like: '좋아요순',
    edit: '수정하기',
    delete: '삭제하기',
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    if (handlers !== null && handlers[option]) {
      handlers[option]();
    }

    onChange(option);
    setIsOpen(false);
  };

  const isOptionKey = (key: string): key is OptionKey => {
    return key in labelMap;
  };

  let optionList;
  if (type === 'sort') {
    optionList = sortOptions.map((opt) => {
      if (isOptionKey(opt)) {
        return (
          <li
            key={opt}
            onClick={() => handleSelect(opt)}
            className={clsx(
              'text-secondary-800 flex h-[42px] w-[130px] cursor-pointer items-center justify-center bg-white text-base leading-[26px] font-normal',
              opt === 'recent' &&
                'border-coolGray-200 rounded-t-[12px] border border-solid bg-white',
              opt === 'like' && 'border-coolGray-200 rounded-b-[12px] border border-solid bg-white',
            )}
          >
            {labelMap[opt]}
          </li>
        );
      }
      return null;
    });
  } else if (type === 'modify') {
    optionList = modifyOptions.map((opt) => {
      if (isOptionKey(opt)) {
        return (
          <li
            key={opt}
            onClick={() => handleSelect(opt)}
            className={clsx(
              'text-secondary-500 flex h-[46px] cursor-pointer items-center justify-center gap-[10px] self-stretch bg-white py-4 pt-4 pb-3 text-center text-base leading-[26px] font-normal',
              opt === 'edit' &&
                'border-coolGray-300 rounded-t-[8px] border-t border-r border-l border-solid',
              opt === 'delete' &&
                'border-coolGray-300 rounded-b-[8px] border-r border-b border-l border-solid',
            )}
          >
            {labelMap[opt]}
          </li>
        );
      }
      return null;
    });
  }

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className={clsx(
          'm-0 cursor-pointer border-none bg-transparent p-0',
          type === 'sort' &&
            'border-coolGray-200 flex h-[42px] w-[130px] flex-col items-start justify-center rounded-[12px] border border-solid bg-white px-5 py-3 whitespace-nowrap',
          type === 'modify' && 'flex h-6 w-6 items-center justify-center py-[5px] pb-[6px]',
        )}
      >
        {type === 'sort' ? (
          <div className="flex items-center justify-center gap-6">
            <div className="text-secondary-800 text-base leading-[26px] font-normal">
              {isOptionKey(selected) ? labelMap[selected] : selected}
            </div>
            <Image src="/icons/ic_arrowDown.svg" alt="ic_arrowDown" width={24} height={24} />
          </div>
        ) : (
          <Image src="/icons/ic_kebab.svg" alt="ic_kebab" width={24} height={24} />
        )}
      </button>
      {isOpen && (
        <ul
          className={clsx(
            'absolute top-full z-[1000] flex w-[130px] flex-col items-start',
            type === 'sort' && 'left-0',
            type === 'modify' && 'right-0',
          )}
        >
          {optionList}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
