import clsx from 'clsx';
import Image from 'next/image';

const getPageNumbers = (page: number, total: number, max: number) => {
  const half = Math.floor(max / 2);
  const start: number = Math.max(1, page - half);
  const end: number = Math.min(total, start + max - 1);

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

interface PaginationProps {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  max: number;
}

const Pagination = ({ page = 1, total = 5, onPageChange = () => {}, max = 5 }: PaginationProps) => {
  const pageNumbers = getPageNumbers(page, total, max);

  const moveToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > total || nextPage === page) return;
    onPageChange(nextPage);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const classNames = {
    pageNumber: 'text-coolGray-500 text-base font-semibold leading-[26px]',
    pageNumberActive: 'text-secondary-100 text-base font-semibold leading-[26px]',
    basicButton:
      'flex w-[40px] h-[40px] p-[12.5px] items-center justify-center rounded-[40px] border border-solid border-coolGray-200 bg-white cursor-pointer',
    basicButtonActive:
      'flex w-[40px] h-[40px] p-[12.5px] items-center justify-center rounded-[40px] bg-[#2f80ed] cursor-pointer',
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <button type="button" onClick={() => moveToPage(page - 1)} className={classNames.basicButton}>
        <Image
          src={
            page > 1
              ? '/icons/pagination/page_left_active.svg'
              : '/icons/pagination/page_left_inactive.svg'
          }
          alt="page_left"
          width={16}
          height={16}
        />
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((number) => (
          <button
            type="button"
            key={number}
            onClick={() => moveToPage(number)}
            className={clsx(
              page === number ? classNames.basicButtonActive : classNames.basicButton,
              page === number ? classNames.pageNumberActive : classNames.pageNumber,
            )}
          >
            {number}
          </button>
        ))}
      </div>

      <button type="button" onClick={() => moveToPage(page + 1)} className={classNames.basicButton}>
        <Image
          src={
            page < total
              ? '/icons/pagination/page_right_active.svg'
              : 'icons/pagination/page_right_inactive.svg'
          }
          alt="page_right"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
};

export default Pagination;
