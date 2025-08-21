import React from "react";
import MarketHeader from "../../components/Layout/Header";
import Footer from "../../components/Footer";
import useRegistrationForm from "../../hooks/useRegistrationForm";
import "/src/assets/css/RegistrationPage.css";

export default function RegistrationPage() {
  const {
    productName,
    setProductName,
    productDescription,
    setProductDescription,
    price,
    setPrice,
    tags,
    tagInput,
    setTagInput,
    handleAddTag,
    handleRemoveTag,
    errors,
    isValid,
    handleFocus,
  } = useRegistrationForm();

  return (
    <>
      <MarketHeader />
      <div className="registrationPageWrapper">
        {/* 상단 헤더 + 등록 버튼 */}
        <div className="registrationHeaderWrapper">
          <div className="registrationHeader">상품 등록하기</div>
          <button
            className={`topSubmitButton ${isValid ? "activeButton" : ""}`}
            disabled={!isValid}
          >
            등록
          </button>
        </div>

        <form className="registrationForm" onSubmit={(e) => e.preventDefault()}>
          {/* 상품명 */}
          <label className="formLabel">상품명</label>
          <input
            type="text"
            placeholder="상품명을 입력해 주세요"
            className={`formInput ${errors.productName ? "errorInput" : ""}`}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            onFocus={() => handleFocus("productName")}
          />
          {errors.productName && (
            <div className="errorMessage">{errors.productName}</div>
          )}

          {/* 상품 소개 */}
          <label className="formLabel">상품 소개</label>
          <textarea
            placeholder="상품 소개를 입력해 주세요"
            className={`formTextarea ${errors.productDescription ? "errorInput" : ""}`}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            onFocus={() => handleFocus("productDescription")}
          />
          {errors.productDescription && (
            <div className="errorMessage">{errors.productDescription}</div>
          )}

          {/* 판매 가격 */}
          <label className="formLabel">판매 가격</label>
          <input
            type="text"
            placeholder="판매 가격을 입력해 주세요"
            className={`formInput ${errors.price ? "errorInput" : ""}`}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onFocus={() => handleFocus("price")}
          />
          {errors.price && <div className="errorMessage">{errors.price}</div>}

          {/* 태그 */}
          <label className="formLabel">태그</label>
          <div className="tagInputWrapper">
            <input
              type="text"
              placeholder="태그를 입력해 주세요"
              value={tagInput}
              className={`formInput ${errors.tagInput ? "errorInput" : ""}`}
              onChange={(e) => setTagInput(e.target.value)}
              onFocus={() => handleFocus("tagInput")}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            {errors.tagInput && (
              <div className="errorMessage">{errors.tagInput}</div>
            )}
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
