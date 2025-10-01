// src/components/Pagination.jsx
export default function Pagination({ page, total, pageSize, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const prev = () => onChange(Math.max(1, page - 1));
  const next = () => onChange(Math.min(totalPages, page + 1));

  return (
    <div className="pagination">
      <button onClick={prev} disabled={page === 1}>이전</button>
      <span>{page} / {totalPages}</span>
      <button onClick={next} disabled={page === totalPages}>다음</button>
    </div>
  );
}
