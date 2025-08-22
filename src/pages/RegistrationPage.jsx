import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/products";
import "../css/registration.css";

export default function RegistrationPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(["티셔츠", "상의"]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isValid = useMemo(() => {
    const p = Number(price);
    return name.trim() && description.trim() && !Number.isNaN(p) && p >= 0;
  }, [name, description, price]);

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, "");
    if (!t) return;
    if (!tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  };
  const removeTag = (t) => setTags((prev) => prev.filter((x) => x !== t));
  const onTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const onSubmit = async (e) => {
    e?.preventDefault?.();
    if (!isValid || submitting) return;
    try {
      setSubmitting(true);
      setErrorMsg("");
      const created = await createProduct({
        name,
        description,
        price: Number(price),
        tags,
        images: [],
      });
      const id = created.id;
      if (id) navigate(`/items/${id}`);
      else throw new Error("생성된 상품 id를 확인할 수 없습니다.");
    } catch (err) {
      setErrorMsg(err?.message ?? "등록 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="reg-wrap reg--page">
      <div className="reg--head">
        <h1>상품 등록하기</h1>
        <button
          type="button"
          className={`reg--submit ${isValid && !submitting ? "active" : ""}`}
          onClick={onSubmit}
          disabled={!isValid || submitting}
        >
          {submitting ? "등록 중..." : "등록"}
        </button>
      </div>

      <form className="reg--form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">상품명</label>
          <input
            id="name"
            type="text"
            placeholder="상품명을 입력해주세요"
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="field">
          <label htmlFor="desc">상품 소개</label>
          <textarea
            id="desc"
            rows={10}
            placeholder="상품 소개를 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="price">판매가격</label>
          <input
            id="price"
            type="number"
            min={0}
            placeholder="판매 가격을 입력해주세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputMode="numeric"
          />
        </div>

        <div className="field">
          <label htmlFor="tag">태그</label>
          <input
            id="tag"
            type="text"
            placeholder="태그를 입력해주세요"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={onTagKeyDown}
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
        </div>

        {errorMsg && <div className="reg--error">{errorMsg}</div>}
        <button type="submit" className="visually-hidden">
          제출
        </button>
      </form>
    </div>
  );
}
