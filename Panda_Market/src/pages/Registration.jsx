import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createItem } from "../services/ItemsApi.js";
import "../styles/registration.css";

export default function Registration() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(["#티셔츠", "#상의"]);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const item = await createItem({
      title,
      description: desc,
      price: Number(price),
      image: "",
    });
    navigate(`/items/${item.id}`);
  };

  const onTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags((prev) => [...prev, `#${tagInput.trim().replace(/^#/, "")}`]);
      setTagInput("");
    }
  };
  const addTag = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const raw = tagInput.trim();
    if (!raw) return;
    const value = raw.startsWith("#") ? raw : `#${raw}`;
    if (!tags.includes(value)) setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const removeTag = (t) => {
    setTags((prev) => prev.filter((x) => x !== t));
  };
  
  return (
    <div>
      <header>
        <div className="frame">
          <Link className="logo" to="/">
            <img src="/images/logo_panda.png" alt="판다마켓 로고" />
          </Link>
          <nav className="nav-inline">
            <Link to="/items" className="nav-market">자유게시판</Link>
            <Link to="/items" className="nav-market">중고마켓</Link>
          </nav>
          <Link className="login" to="/login">
            <div className="login_button">로그인</div>
          </Link>
        </div>
      </header>

      <main className="reg">
        <div className="reg-inner">
          <div className="reg-head">
            <h2 className="reg-title">상품 등록하기</h2>
            <button type="button" className="reg-submit">등록</button>
          </div>

          <form className="reg-form">
            <div className="reg-field">
              <label htmlFor="title">상품명</label>
              <input id="title" className="reg-input" placeholder="상품명을 입력해주세요" />
            </div>

            <div className="reg-field">
              <label htmlFor="desc">상품 소개</label>
              <textarea id="desc" className="reg-textarea" placeholder="상품 소개를 입력해주세요" />
            </div>

            <div className="reg-field">
              <label htmlFor="price">판매가격</label>
              <input id="price" className="reg-input" placeholder="판매 가격을 입력해주세요" />
            </div>

            <div className="reg-field">
              <label htmlFor="tags">태그</label>
              <input id="tags" className="reg-input" placeholder="태그를 입력해주세요" />
              <div className="reg-tags">
                <span className="reg-chip">#티셔츠
                  <button type="button" className="chip-x" aria-label="태그 삭제">
                    <img src="/images/ic_X.png" alt="태그삭제" />
                  </button>
                </span>
                <span className="reg-chip">#상의
                  <button type="button" className="chip-x" aria-label="태그 삭제">
                    <img src="/images/ic_X.png" alt="태그삭제" />
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </main>

      <footer>
        <div className="footer_total">
          <p className="footer_codeit">©codeit - 2024</p>
          <div className="footer_layout">
            <Link to="/privacy" className="footer_ment">Privacy Policy</Link>
            <Link to="/faq" className="footer_ment">FAQ</Link>
          </div>
          <div className="icon_layout">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <img className="icon_img" src="/images/ic_facebook.png" alt="페이스북 아이콘"/>
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              <img className="icon_img" src="/images/ic_twitter.png" alt="트위터 아이콘"/>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <img className="icon_img" src="/images/ic_youtube.png" alt="유튜브 아이콘"/>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <img className="icon_img" src="/images/ic_instagram.png" alt="인스타그램 아이콘"/>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
