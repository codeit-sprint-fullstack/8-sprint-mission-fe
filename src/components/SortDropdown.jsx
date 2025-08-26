export default function SortDropdown({
  value,
  onChange,
  options = [
    { value: "recent", label: "최신순" },
    { value: "like", label: "좋아요순" },
  ],
}) {
  return (
    <div className="sortSelect">
      <select value={value} onChange={(e) => onChange?.(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
