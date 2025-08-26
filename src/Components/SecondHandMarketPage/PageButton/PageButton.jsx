// 여기가 페이지네이션 기능

import style from './PageButton.module.css';
import ic_arrow_left from '../../../images/ic_PageButton_left.svg';
import ic_arrow_right from '../../../images/ic_PageButton_right.svg';

function PageButton({ nowPage = 1, buttonLength = 5, pageSize = 10, totalCount = 50, onChange = null }) {
  const startPage = Math.floor((nowPage - 1) / buttonLength) * buttonLength + 1;
  const maxPage = Math.ceil(totalCount / pageSize);

  const pages = Array.from({ length: buttonLength }, (_, i) => startPage + i)  // _는 콜백 함수 매개변수 중 첫 번째(값)는 무시하고, 두 번째(인덱스)를 사용하겠다는 의미
                      .filter(pageNum => pageNum <= maxPage);

  return (
    <div className={style.PageButtons}>
      <button
        onClick={() => onChange?.(nowPage - 1)}
        disabled={nowPage <= 1}  // 첫 번째 페이지에서는 이전 버튼 비활성화
      >
        <img src={ic_arrow_left} alt='왼쪽 화살표' />
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
        disabled={nowPage >= maxPage}  // 마지막 페이지에서는 다음 버튼 비활성화
      >
        <img src={ic_arrow_right} alt='오른쪽 화살표' />
        {/* CSS로 화살표 좌우반전 가능하대! */}
      </button>
    </div>
  );
}

export default PageButton;