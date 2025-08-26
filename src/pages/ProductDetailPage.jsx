import { useParams, Link } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();
  return (
    <div style={{ padding: "32px 360px" }}>
      <h1>상품 상세</h1>
      <p>
        상품 ID: <strong>{id}</strong>
      </p>
      <p>준비 중입니다.</p>
      <p>
        <Link to="/items">← 목록으로</Link>
      </p>
    </div>
  );
}
