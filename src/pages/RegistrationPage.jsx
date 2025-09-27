import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../services/products'
import '../styles/registration.css'  // 스타일 적용

export default function RegistrationPage(){
  const nav = useNavigate()

  // 폼 상태
  const [name, setName] = useState('')
  const [description, setDesc] = useState('')
  const [price, setPrice] = useState('')

  // 태그 상태
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])

  const [loading, setLoading] = useState(false)

  // 태그 추가/삭제
  const addTag = () => {
    const t = tagInput.trim()
    if (!t) return
    if (t.length > 5) return alert('태그는 5글자 이내예요.')
    if (tags.includes(t)) return
    setTags(prev => [...prev, t])
    setTagInput('')
  }
  const onTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }
  const removeTag = (t) => setTags(prev => prev.filter(x => x !== t))

  const disabled =
    !name.trim() || !description.trim() || !String(price).trim() || loading
  

  const submit = async (e) => {
    e.preventDefault()
    if (disabled) return

    try {
      setLoading(true)
      const payload = {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        tags
      }
      const { id } = await createProduct(payload)
      nav(`/items/${id}`) // 성공 시 상세(빈 페이지)로 이동
    } catch (err) {
      console.error(err)
      alert('등록 중 오류가 발생했어요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="reg-wrap">
      <div className= "reg-head">
      <h2>상품 등록하기</h2>
        <button className="btn primary small" form="regform" disabled={disabled}>
          {loading ? '등록 중…' : '등록'}
        </button>
      </div>

      <form className="reg-form" onSubmit={submit}>
        {/* 상품명 */}
        <div className="field">
          <label className="label">상품명</label>
          <input
            className="reg-input"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="상품명을 입력해주세요"
          />
        </div>

        {/* 상품 소개 */}
        <div className="field">
          <label className="label">상품 소개</label>
          <textarea
            className="reg-textarea"
            rows={6}
            value={description}
            onChange={(e)=>setDesc(e.target.value)}
            placeholder="상품 소개를 입력해주세요"
          />
        </div>

        {/* 판매 가격 */}
        <div className="field">
          <label className="label">판매 가격</label>
          <input
            className="reg-input"
            type="number"
            inputMode="numeric"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            placeholder="판매 가격을 입력해주세요"
          />
        </div>

        {/* 태그 */}
        <div className="field">
          <label className="label">태그</label>
          <div className="tag-row">
            <input
              className="reg-input"
              value={tagInput}
              onChange={(e)=>setTagInput(e.target.value)}
              onKeyDown={onTagKeyDown}
              placeholder="태그를 입력 후 엔터"
            />
          </div>

          {tags.length > 0 && (
            <div className="chips">
              {tags.map((t)=>(
                <span key={t} className="chip">
                  #{t}
                  <button
                    type="button"
                    className="chip-x"
                    onClick={()=>removeTag(t)}
                    aria-label={`${t} 삭제`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        
      </form>
    </main>
  )
}