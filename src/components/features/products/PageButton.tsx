import { useState } from 'react';
import { useDeviceProvider } from '@/components/provider/DevicePorvider';

import Image from 'next/image';
import arrowLeft from '@/images/pageButton/arrow_left.svg';
import arrowRight from '@/images/pageButton/arrow_right.svg';

interface PageButtonProps {
  pageIdx: number;
  onPageChange: (pageIdx: number) => void;
  disabled: boolean;
}

function PageButton({ pageIdx, onPageChange, disabled }: PageButtonProps) {
  const deviceType = useDeviceProvider();
  const PageNums = deviceType === 'mobile' ? [1, 2, 3] : [1, 2, 3, 4, 5];
  const [pageListIdx, setPageListIdx] = useState(0); //페이지 리스트 (1) : 1 ~ 5 페이지, (2) : 6 ~ 10

  const handlePageListChange = (upDown: 'up' | 'down') => {
    switch (upDown) {
      case 'up':
        if (pageListIdx < 20) {
          const nextPage = pageListIdx + 1;
          setPageListIdx(nextPage);
          onPageChange(nextPage * 5 + 1);
        }
        break;
      case 'down':
        if (pageListIdx > 0) {
          const nextPage = pageListIdx - 1;
          setPageListIdx(nextPage);
          onPageChange(nextPage * 5 + 1);
        }
        break;
      default:
        break;
    }
  };

  const handlePageBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(parseInt(e.currentTarget.textContent));
  };

  return (
    <div className="flex gap-[4px]">
      <button
        onClick={() => handlePageListChange('down')}
        disabled={disabled}
        className="flex items-center justify-center border-1 border-[var(--Cool-Gray-200)] rounded-[999px] w-[42px] h-[42px]"
      >
        <Image src={arrowLeft} alt="pageButtonLeft" />
      </button>
      {PageNums.map((e) => {
        const pageNum = e + pageListIdx * 5;
        let btnStyle;
        pageNum == pageIdx ? (btnStyle = selectedStyle) : (btnStyle = commonStyle);
        return (
          <button
            key={e}
            style={btnStyle}
            onClick={handlePageBtn}
            disabled={disabled}
            className="flex items-center justify-center border-1 border-[var(--Cool-Gray-200)] rounded-[999px] w-[42px] h-[42px]"
          >
            {pageNum}
          </button>
        );
      })}
      <button
        onClick={() => handlePageListChange('up')}
        disabled={disabled}
        className="flex items-center justify-center border-1 border-[var(--Cool-Gray-200)] rounded-[999px] w-[42px] h-[42px]"
      >
        <Image src={arrowRight} alt="pageButtonRight" />
      </button>
    </div>
  );
}

const commonStyle = {
  background: '#FFFFFF',
  color: 'var(--Cool-Gray-500, #6B7280)',
};

const selectedStyle = {
  background: '#2F80ED',
  color: 'var(--Secondary-100, #F9FAFB)',
};

export default PageButton;
