export default function SortDropdown({ sort, onChange }) {
  return (
    <select value={sort} onChange={(e) => onChange(e.target.value)}>
      <option value="createdAt">최신순</option>
      <option value="favorite">좋아요순</option>
    </select>
  );
}
