// src/components/SortDropdown.jsx
export default function SortDropdown({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="createdAt">최신 순</option>
      <option value="favorite">좋아요 순</option>
    </select>
  );
}
