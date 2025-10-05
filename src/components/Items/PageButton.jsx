import Image from "next/image";

const PageButton = ({
  nowPage = 1,
  buttonLength = 5,
  pageSize = 10,
  totalCount = 50,
  onChange = null,
}) => {
  const startPage = Math.floor((nowPage - 1) / buttonLength) * buttonLength + 1;
  const maxPage = Math.ceil(totalCount / pageSize);

  const pages = Array.from(
    { length: buttonLength },
    (_, i) => startPage + i
  ).filter((pageNum) => pageNum <= maxPage);

  return (
    <div className="flex justify-center gap-2 my-[40px]">
      <button
        onClick={() => onChange?.(nowPage - 1)}
        disabled={nowPage <= 1}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white disabled:bg-gray-200"
      >
        <Image
          src="ic_PageButton_left.svg"
          alt="이전 페이지"
          width={40}
          height={40}
        />
      </button>

      {pages.map((pageNum) => {
        const isCurrent = nowPage === pageNum;
        return (
          <button
            key={`page-${pageNum}`}
            onClick={isCurrent ? undefined : () => onChange?.(pageNum)}
            className={`flex items-center justify-center w-10 h-10 rounded-full border font-semibold text-gray-500
              ${
                isCurrent
                  ? "bg-blue-500 text-white border-none"
                  : "bg-white border-gray-300"
              }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onChange?.(nowPage + 1)}
        disabled={nowPage >= maxPage}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white disabled:bg-gray-200"
      >
        <Image
          src="ic_PageButton_right.svg"
          alt="다음 페이지"
          width={40}
          height={40}
        />
      </button>
    </div>
  );
};

export default PageButton;
