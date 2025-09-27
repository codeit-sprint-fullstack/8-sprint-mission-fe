import { useEffect, useState } from 'react'
import { getProducts } from '../services/products'
import { Link, useNavigate } from 'react-router-dom'


const DEFAULT_IMG = '/img/placeholder.png'

export default function ItemsPage(){
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [limit] = useState(10)
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()

  const fetchList = async () => {
    try {
      setLoading(true); setError('')
      const data = await getProducts({ offset, limit, q, sort:'recent' })
      setItems(data.items); setTotal(data.total)
    } catch (e) {
      setError('목록을 불러오지 못했어요.')
    } finally { setLoading(false) }
  }

  useEffect(()=>{ fetchList() }, [offset])
  const onSearch = () => { setOffset(0); fetchList() }

  const canPrev = offset > 0
  const canNext = offset + limit < total

  return (
    <main style={{padding:24, maxWidth:1100, margin:'0 auto'}}>
      <div style={{display:'flex', gap:8, alignItems:'center', margin:'12px 0'}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="검색할 상품을 입력해주세요"
               style={{flex:1, padding:10, border:'1px solid #e5e7eb', borderRadius:12}} />
        <button onClick={onSearch}>검색</button>
        <button onClick={()=>nav('/registration')}>상품 등록하기</button>
      </div>

      {loading && <p>로딩중…</p>}
      {error && <p style={{color:'red'}}>{error}</p>}

      <ul style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:24}}>
        {items.map(p=>(
          <li key={p.id} style={{border:'1px solid #f0f2f4', borderRadius:16, padding:16}}>
            <img
              src={DEFAULT_IMG}
              alt=""
              onError={(e)=>{e.currentTarget.src = DEFAULT_IMG}}  // 디폴트 이미지 처리
              style={{width:'100%', height:140, objectFit:'cover', borderRadius:12}}
            />
            <h3 style={{margin:'12px 0 4px', fontWeight:600}}>{p.name}</h3>
            <p style={{margin:0}}>{(p.price ?? 0).toLocaleString()}원</p>
            <Link to={`/items/${p.id}`} style={{display:'inline-block', marginTop:8}}>자세히</Link>
          </li>
        ))}
      </ul>

      <div style={{display:'flex', gap:8, justifyContent:'center', marginTop:20}}>
        <button disabled={!canPrev} onClick={()=>setOffset(o=>Math.max(o-limit,0))}>이전</button>
        <span>{offset/limit + 1}</span>
        <button disabled={!canNext} onClick={()=>setOffset(o=>o+limit)}>다음</button>
      </div>
    </main>
  )
}

