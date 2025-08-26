import SmallButton from "@/components/Button/SmallButton";
import "./Registration.css";

function Registration() {
  return (
    <form>
      <div className="top">
        <div className="header">상품 등록하기</div>
        <SmallButton disabled={true} type={"submit"}>
          등록
        </SmallButton>
      </div>
      <div className="form-body">
        <label htmlFor="title">상품명</label>
        <input id="title" type="text" placeholder="상품명을 입력해주세요" />
      </div>
      <div className="form-body">
        <label htmlFor="description">상품 소개</label>
        <textarea id="description" placeholder="상품 소개를 입력해주세요" />
      </div>
      <div className="form-body">
        <label htmlFor="price">판매가격</label>
        <input
          id="price"
          type="number"
          placeholder="판매 가격을 입력해주세요"
        />
      </div>
      <div className="form-body">
        <label htmlFor="tag">태그</label>
        <input id="tag" type="text" placeholder="태그를 입력해주세요" />
        {/* TODO: 엔터 => 태그 append */}
      </div>
    </form>
  );
}

export default Registration;
