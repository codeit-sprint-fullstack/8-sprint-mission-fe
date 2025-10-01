import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useProductRegistrationForm from '../hooks/useProductRegistrationForm';
import { createProduct } from '../services/productService';
import '../styles/registration.css';

function Registration() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    values: { name, desc, price, tagInput, tags },
    setters: { setName, setDesc, setPrice, setTagInput },
    addTag, removeTag, onKeyDownTagInput,
    errors, tagInputError, isValid,
    setSubmitted, onFieldFocus, onFieldBlur, shouldShowError,
  } = useProductRegistrationForm();

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;
    try {
      setSubmitting(true);
      const res = await createProduct({
        name,
        description: desc,
        price: Number(price),
        tags,
      });
      const id = res?.id ?? res?._id ?? res?.product?.id ?? res?.data?.id ?? Date.now();
      navigate(`/items/${id}`);
    } catch (err) {
      console.error('[상품 등록 실패]', err);
      alert('상품 등록에 실패했습니다, 잠시 후 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="registration-page">
        <section className="reg-card">
          <div className="reg-card-header">
            <h1 className="reg-title">상품 등록하기</h1>
            <button
              type="submit"
              form="reg-form"
              className="reg-top-submit"
              disabled={!isValid || submitting}
              aria-disabled={!isValid || submitting}
            >
              등록
            </button>
          </div>

          <form id="reg-form" className="reg-form" onSubmit={onSubmit}>
            <div className="reg-row">
              <label htmlFor="name" className="reg-label">상품명</label>
              <div className="reg-field">
                <input
                  id="name"
                  className={`reg-input${shouldShowError('name') ? ' is-invalid' : ''}`}
                  type="text"
                  placeholder="상품명을 입력해주세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={onFieldFocus('name')}
                  onBlur={onFieldBlur('name')}
                  aria-invalid={shouldShowError('name')}
                />
                {shouldShowError('name') && <p className="reg-error">{errors.name}</p>}
              </div>
            </div>

            <div className="reg-row">
              <label htmlFor="desc" className="reg-label">상품소개</label>
              <div className="reg-field">
                <textarea
                  id="desc"
                  className={`reg-textarea${shouldShowError('desc') ? ' is-invalid' : ''}`}
                  rows={6}
                  placeholder="상품 소개를 입력해주세요"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  onFocus={onFieldFocus('desc')}
                  onBlur={onFieldBlur('desc')}
                  aria-invalid={shouldShowError('desc')}
                />
                {shouldShowError('desc') && <p className="reg-error">{errors.desc}</p>}
              </div>
            </div>

            <div className="reg-row">
              <label htmlFor="price" className="reg-label">판매가격</label>
              <div className="reg-field">
                <input
                  id="price"
                  className={`reg-input${shouldShowError('price') ? ' is-invalid' : ''}`}
                  type="number"
                  inputMode="numeric"
                  placeholder="판매 가격을 입력해주세요"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  onFocus={onFieldFocus('price')}
                  onBlur={onFieldBlur('price')}
                  aria-invalid={shouldShowError('price')}
                />
                {shouldShowError('price') && <p className="reg-error">{errors.price}</p>}
              </div>
            </div>

            <div className="reg-row">
              <label htmlFor="tags" className="reg-label">태그</label>
              <div className="reg-field">
                <input
                  id="tags"
                  className={`reg-input${(shouldShowError('tags') || tagInputError) ? ' is-invalid' : ''}`}
                  type="text"
                  placeholder="태그를 입력해주세요"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={onKeyDownTagInput}
                  onFocus={onFieldFocus('tags')}
                  onBlur={onFieldBlur('tags')}
                  aria-invalid={shouldShowError('tags') || !!tagInputError}
                />
                {(tagInputError || shouldShowError('tags')) && (
                  <p className="reg-error">{tagInputError || errors.tags}</p>
                )}

                <div className="reg-chips">
                  {tags.map((t) => (
                    <span key={t} className="reg-chip">
                      #{t}
                      <button
                        type="button"
                        className="reg-chip-remove"
                        aria-label={`${t} 태그 삭제`}
                        onClick={() => removeTag(t)}
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Registration;