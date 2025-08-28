import { useParams } from 'react-router-dom';
import '../styles/item_detail.css';

export default function ItemDetailPage() {
    const { id } = useParams();
    return (
        <main>
            <div className="wrapper detail-wrapper">
                <h2>상품 상세 (빈 페이지)</h2>
                <p>상품 ID: {id}</p>
            </div>
        </main>
    );
}
