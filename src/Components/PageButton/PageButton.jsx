// 여기가 페이지네이션 기능

import style from './PageButton.module.css';
import ic_arrow_left from './ic_PageButton_left.svg';
import ic_arrow_right from './ic_PageButton_right.svg';

function PageButton() {
  

  return (
    <div className="PageButtons">
      <button
        onClick={() => onChange?.(nowPage - 1)}
        disabled={nowPage <= 1}
      >
        <img src={ic_arrow_left} />
      </button>

      {pages.map((pageNum) => {
        const isCurrent = nowPage === pageNum;
        return (
          <button
            key={`page-${pageNum}`}
            onClick={isCurrent ? undefined : () => onChange?.(pageNum)}
            className={`${style.pageBtn} ${isCurrent ? style.selected : ''}`}  // 현재 페이지 버튼색 바꾸기
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onChange?.(nowPage + 1)}
        disabled={nowPage >= maxPage}
      >
        <img src={ic_arrow_right} />
      </button>
    </div>
  );
}

export default PageButton;