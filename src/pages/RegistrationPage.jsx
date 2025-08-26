import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/products";
import useProductValidation from "../hooks/useProductValidation";
import "../css/registration.css";

export default function RegistrationPage() {
  const navigate = useNavigate();

  // 폼 상태
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]); // 기본 비어있음  버튼 비활성화
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 유효성 검사 훅
  const { errors, isValid, touched, setTouched, onBlur, shouldShow } =
    useProductValidation({ name, description, price, tags, tagInput });

  // 태그 추가/삭제
  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, "");
    if (!t) return;
    if (t.length > 5) {
      setTouched((p) => ({ ...p, tagInput: true, tags: true }));
      return;
    }
    if (!tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
    setTouched((p) => ({ ...p, tags: true }));
  };
  const removeTag = (t) => {
    setTags((prev) => prev.filter((x) => x !== t));
    setTouched((p) => ({ ...p, tags: true }));
  };
  const onTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid || submitting) return;

    try {
      setSubmitting(true);
      setErrorMsg("");
      const payload = {
        name,
        description,
        price: Number(price),
        tags,
        images: [], // 스펙: 이미지 업로드 제외(프론트 기본 이미지 처리)
      };
      const created = await createProduct(payload);
      const id = created.id;
      if (id) navigate(`/items/${id}`);
      else throw new Error("생성된 상품 id를 확인할 수 없습니다.");
    } catch (err) {
      setErrorMsg(err?.message ?? "등록 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  // 버튼 활성화 조건: 유효성 통과 + 제출 중 아님
  const canSubmit = isValid && !submitting;

  return (
    <div className="reg-wrap reg--page">
      <div className="reg--head">
        <h1>상품 등록하기</h1>
        <button
          type="button"
          className={`reg--submit ${canSubmit ? "active" : ""}`}
          onClick={onSubmit}
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
        >
          {submitting ? "등록 중..." : "등록"}
        </button>
      </div>

      <form className="reg--form" onSubmit={onSubmit} noValidate>
        <div
          className={`field ${shouldShow("name", submitted) ? "invalid" : ""}`}
        >
          <label htmlFor="name">상품명</label>
          <input
            id="name"
            type="text"
            placeholder="상품명을 입력해주세요 (1~10자)"
            maxLength={10}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={onBlur("name")}
            autoComplete="off"
            aria-invalid={!!errors.name}
            aria-describedby="err-name"
          />
          {shouldShow("name", submitted) && (
            <p id="err-name" className="error-text">
              {errors.name}
            </p>
          )}
        </div>

        <div
          className={`field ${
            shouldShow("description", submitted) ? "invalid" : ""
          }`}
        >
          <label htmlFor="desc">상품 소개</label>
          <textarea
            id="desc"
            rows={8}
            placeholder="상품 소개를 입력해주세요 (10~100자)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={onBlur("description")}
            aria-invalid={!!errors.description}
            aria-describedby="err-desc"
          />
          {shouldShow("description", submitted) && (
            <p id="err-desc" className="error-text">
              {errors.description}
            </p>
          )}
        </div>

        <div
          className={`field ${shouldShow("price", submitted) ? "invalid" : ""}`}
        >
          <label htmlFor="price">판매가격</label>
          <input
            id="price"
            type="number"
            min={0}
            placeholder="판매 가격을 입력해주세요 (숫자)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onBlur={onBlur("price")}
            inputMode="numeric"
            aria-invalid={!!errors.price}
            aria-describedby="err-price"
          />
          {shouldShow("price", submitted) && (
            <p id="err-price" className="error-text">
              {errors.price}
            </p>
          )}
        </div>

        <div
          className={`field ${
            shouldShow("tags", submitted) || shouldShow("tagInput", submitted)
              ? "invalid"
              : ""
          }`}
        >
          <label htmlFor="tag">태그</label>
          <input
            id="tag"
            type="text"
            placeholder="태그를 입력 후 Enter (각 5자 이내)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={onTagKeyDown}
            onBlur={onBlur("tagInput")}
            aria-invalid={!!errors.tagInput || !!errors.tags}
            aria-describedby="err-tags"
          />
          <div className="tag-list">
            {tags.map((t) => (
              <span key={t} className="tag-chip">
                <span className="hash">#</span>
                {t}
                <button
                  type="button"
                  aria-label={`${t} 태그 삭제`}
                  onClick={() => removeTag(t)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {(shouldShow("tags", submitted) ||
            shouldShow("tagInput", submitted)) && (
            <p id="err-tags" className="error-text">
              {errors.tagInput || errors.tags}
            </p>
          )}
        </div>

        {errorMsg && <div className="reg--error">{errorMsg}</div>}

        <button type="submit" className="visually-hidden">
          제출
        </button>
      </form>
    </div>
  );
}
