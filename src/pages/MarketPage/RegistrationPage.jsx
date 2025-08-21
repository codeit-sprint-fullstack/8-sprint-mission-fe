import React, { useState } from "react";
import MarketHeader from "../../components/Layout/Header";
import Footer from "../../components/Footer";
import "/src/assets/css/RegistrationPage.css";

export default function RegistrationPage() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <>
      <MarketHeader />
      <div className="registrationPageWrapper">
        {/* 상단 헤더 + 등록 버튼 */}
        <div className="registrationHeaderWrapper">
          <div className="registrationHeader">상품 등록하기</div>
          <button className="topSubmitButton">등록</button>
        </div>

        <form className="registrationForm">
          {/* 상품명 */}
          <label className="formLabel">상품명</label>
          <input
            type="text"
            placeholder="상품명을 입력해 주세요"
            className="formInput"
          />

          {/* 상품 소개 */}
          <label className="formLabel">상품 소개</label>
          <textarea
            placeholder="상품 소개를 입력해 주세요"
            className="formTextarea"
          />

          {/* 판매 가격 */}
          <label className="formLabel">판매 가격</label>
          <input
            type="text"
            placeholder="판매 가격을 입력해 주세요"
            className="formInput"
          />

          {/* 태그 */}
          <label className="formLabel">태그</label>
          <div className="tagInputWrapper">
            <input
              type="text"
              placeholder="태그를 입력해 주세요"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              className="formInput"
            />
            <div className="tagList">
              {tags.map((tag) => (
                <div key={tag} className="tagItem">
                  #{tag}
                  <span onClick={() => handleRemoveTag(tag)}>x</span>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
