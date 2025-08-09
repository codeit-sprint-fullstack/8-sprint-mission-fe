export default function Pagination({ page, total, pageSize, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const WINDOW = 5;
  const windowStart = Math.floor((page - 1) / WINDOW) * WINDOW + 1;
  const windowEnd = Math.min(windowStart + WINDOW - 1, totalPages);

  const pages = [];
  for (let n = windowStart; n <= windowEnd; n++) pages.push(n);

  return (
    <div className="pagination">
      <button onClick={() => onChange(Math.max(1, windowStart - 1))} disabled={windowStart === 1}>{'<'}</button>
      {pages.map((n) => (
        <button key={n} onClick={() => onChange(n)} className={n === page ? 'active' : ''}>
          {n}
        </button>
      ))}
      <button onClick={() => onChange(Math.min(totalPages, windowEnd + 1))} disabled={windowEnd === totalPages}>{'>'}</button>
    </div>
  );
}
