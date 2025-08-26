function getPageWindow(current, total, win = 5) {
  const half = Math.floor(win / 2);
  let start = Math.max(1, current - half);
  let end = start + win - 1;
  if (end > total) {
    end = total;
    start = Math.max(1, end - win + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Pagination({
  page,
  totalPages,
  onChange,
  windowSize = 5,
}) {
  const pages = getPageWindow(page, totalPages, windowSize);
  return (
    <div className="pagination pagination--numbers">
      <button
        type="button"
        className="pg-btn"
        disabled={page <= 1}
        onClick={() => onChange(Math.max(1, page - 1))}
        aria-label="이전 페이지"
      >
        ‹
      </button>

      {pages.map((n) => (
        <button
          type="button"
          key={n}
          className={`pg-btn ${n === page ? "active" : ""}`}
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        className="pg-btn"
        disabled={page >= totalPages}
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        aria-label="다음 페이지"
      >
        ›
      </button>
    </div>
  );
}
