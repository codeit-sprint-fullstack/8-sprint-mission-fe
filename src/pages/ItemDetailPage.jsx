import { useParams } from 'react-router-dom'

export default function ItemDetailPage(){
  const { id } = useParams()
  return (
    <main style={{padding:24}}>
      <h2>상품 상세 (빈 페이지)</h2>
      <p>id: {id}</p>
    </main>
  )
}

