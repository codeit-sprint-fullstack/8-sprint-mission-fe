import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Componet/Header'
import Footer from '../Componet/Footer'
import axios from 'axios'
import '../css/ProductPathPage.css'

const RegistrationPage = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const navigate = useNavigate()

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (tagInput.length <= 5 && !tags.includes(tagInput)) {
        setTags([...tags, tagInput])
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/items', {
        title,
        description,
        price: Number(price),
        tags,
      })

      // ✅ 등록 성공 → 상품 목록 페이지로 이동
      navigate('/items')
    } catch (err) {
      console.error('상품 등록 실패:', err)
      alert('상품 등록에 실패했습니다.')
    }
  }

  return (
    <div>
      <Header />
      <main className='registrationContainer'>
        <div className='registrationHeader'>
          <h2>상품 등록하기</h2>
          <button
            className='submitButton'
            onClick={handleSubmit}
            disabled={!title || description.length < 10 || !price}
          >
            등록
          </button>
        </div>

        <form className='registrationForm' onSubmit={handleSubmit}>
          <label>상품명</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='상품명을 입력해주세요'
          />

          <label>상품 소개</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='상품 소개를 입력해주세요 (10자 이상)'
          />

          <label>판매가격</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='판매 가격을 입력해주세요'
          />

          <label>태그</label>
          <input
            type='text'
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder='태그를 입력 후 엔터'
          />
          <div className='tagList'>
            {tags.map((tag, idx) => (
              <span key={idx} className='tagChip'>
                #{tag}
                <button type='button' onClick={() => handleRemoveTag(tag)}>
                  ×
                </button>
              </span>
            ))}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default RegistrationPage
