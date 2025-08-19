import arrow from "../../assets/icon/arrow_right.svg";
import "./Pagination.css";

function Pagination({
  totalItems,
  pageSize = 10,
  pageRange = 5,
  currentPage,
  onChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize); // 전체 페이지 수

  if (totalPages === 0) return null;

  const currentGroup = Math.floor((currentPage - 1) / pageRange);
  const startPage = currentGroup * pageRange + 1; // 시작페이지 번호
  const endPage = Math.min(startPage + pageRange - 1, totalPages); // 끝페이지 번호

  const handleClick = (page) => {
    if (page < 1 || page > totalPages) return;
    onChange(page);
  };

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        className={`pageBtn page-${i} ${currentPage === i ? "on" : ""}`}
        key={i}
        onClick={() => handleClick(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination">
      <button
        className="pageBtn arrow_left"
        onClick={() => handleClick(startPage - 1)}
        disabled={startPage === 1}
      >
        <img src={arrow} alt="arrow_left" />
      </button>
      {pages}
      <button
        className="pageBtn arrow_right"
        onClick={() => handleClick(endPage + 1)}
        disabled={endPage === totalPages}
      >
        <img src={arrow} alt="arrow_right" />
      </button>
    </div>
  );
}

export default Pagination;
