import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/products";
import { useProductRules, useValidate } from "../hooks/useValidation";
import "../styles/registration.css";

export default function RegistrationPage() {
  const nav = useNavigate();
  const { nameOK, descOK, priceOK, tagOK, messages } = useProductRules();

  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [tagError, setTagError] = useState("");

  // 현재 값으로 에러 계산 (제출 버튼 비활성화 판단 용)
  const { errors: calcErrors } = useValidate({ name, description, price, tagInput });

  const onBlur = (key) => setTouched((t) => ({ ...t, [key]: true }));

  // 태그 추가
  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;

    if (!tagOK(t)) {
      setTagError(messages.tag);
      return;
    }
    if (tags.includes(t)) {
      setTagError(messages.tagDup);
      return;
    }
    setTags((arr) => [...arr, t]);
    setTagInput("");
    setTagError("");
  };

  const onTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };
  const removeTag = (t) => setTags((arr) => arr.filter((x) => x !== t));

  const submit = async (e) => {
    e.preventDefault();

    // 전부 터치 처리 → 에러 표시 유도
    setTouched({ name: true, description: true, price: true, tags: true });

    // 최종 검증
    const noEmpty = name.trim() && description.trim() && price.trim() && tags.length > 0;
    const allValid = nameOK(name) && descOK(description) && priceOK(price);

    if (!noEmpty || !allValid) return;

    try {
      setLoading(true);
      const { id } = await createProduct({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        tags,
      });
      nav(`/items/${id}`); // 성공시 빈 상세 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("등록 중 오류가 발생했어요.");
    } finally {
      setLoading(false);
    }
  };

  // 버튼 비활성화 규칙: 하나라도 비어있으면 비활성화 (+ 계산된 에러가 있으면 비활성화)
  const disabled =
    loading ||
    !name.trim() ||
    !description.trim() ||
    !price.trim() ||
    tags.length === 0 ||
    Object.keys(calcErrors).length > 0;

  return (
    <main className="reg-wrap">
      <form id="reg-form" className="reg-form" onSubmit={submit}>
        {/* 상단 제목 + 등록 버튼 */}
        <div className="reg-head">
          <h2 className="reg-text">상품 등록하기</h2>
          <button className="btn primary" type="submit" disabled={disabled}>
            {loading ? "등록 중…" : "등록"}
          </button>
        </div>

        {/* 상품명 */}
        <div className="reg-group">
          <label className="reg-label">상품명</label>
          <input
            className={`reg-input ${touched.name && !nameOK(name) ? "invalid" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => onBlur("name")}
            placeholder="상품명을 입력해주세요"
          />
          {touched.name && !nameOK(name) && (
            <p className="error-text">{messages.name}</p>
          )}
        </div>

        {/* 상품 소개 */}
        <div className="reg-group">
          <label className="reg-label">상품 소개</label>
          <textarea
            rows={6}
            className={`reg-textarea ${touched.description && !descOK(description) ? "invalid" : ""}`}
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            onBlur={() => onBlur("description")}
            placeholder="상품 소개를 입력해주세요"
          />
          {touched.description && !descOK(description) && (
            <p className="error-text">{messages.description}</p>
          )}
        </div>

        {/* 판매 가격 */}
        <div className="reg-group">
          <label className="reg-label">판매 가격</label>
          <input
            className={`reg-input ${touched.price && !priceOK(price) ? "invalid" : ""}`}
            type="number"
            inputMode="numeric"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onBlur={() => onBlur("price")}
            placeholder="판매 가격을 입력해주세요"
          />
          {touched.price && !priceOK(price) && (
            <p className="error-text">{messages.price}</p>
          )}
        </div>

        {/* 태그 */}
        <div className="reg-group">
          <label className="reg-label">태그</label>
          <input
            className={`tag-input ${tagError ? "invalid" : ""}`}
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value);
              if (tagError) setTagError("");
            }}
            onKeyDown={onTagKeyDown}
            onBlur={() => onBlur("tags")}
            placeholder="태그를 입력해주세요"
          />
          {tagError && <p className="error-text">{tagError}</p>}

          <div className="chip-list">
            {tags.map((t) => (
              <span key={t} className="chip">
                <span className="chip-text">#{t}</span>
                <button
                  type="button"
                  className="chip-remove"
                  aria-label={`${t} 태그 삭제`}
                  onClick={() => removeTag(t)}
                >
                  <img src="/img/x.png" alt="" />
                </button>
              </span>
            ))}
          </div>
          {touched.tags && tags.length === 0 && (
            <p className="error-text">태그를 1개 이상 추가하세요</p>
          )}
        </div>
      </form>
    </main>
  );
}