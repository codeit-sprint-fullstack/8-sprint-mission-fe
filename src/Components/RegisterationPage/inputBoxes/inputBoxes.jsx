import style from './inputBoxes.module.css';
import Tag from './Tag/Tag.jsx';

function InputBoxes() {

  // const name = ;

  return (
    <div className={style.inputBoxes}>
      <div className={style.container}>
        <label>상품명</label>
        <input type="text" placeholder='상품명을 입력해주세요.' maxlength="10" required />
        <span className={style.errorMessage}>10자 이내로 입력해주세요.</span>
      </div>

      <div className={style.container}>
        <label>상품 소개</label>
        <input type="text" className={style.introduceInput} placeholder='상품 소개를 입력해주세요.' minlength="10" required />
        <span className={style.errorMessage}>10자 이상 입력해주세요.</span>
      </div>

      <div className={style.container}>
        <label>판매가격</label>
        <input type="number" placeholder='판매가격을 입력해주세요.' />
        <span className={style.errorMessage}>숫자로 입력해주세요.</span>
      </div>

      <div className={style.container}>
        <label>태그</label>
        <input type="text" placeholder='태그를 입력해주세요.' maxlength="5" required />
        <span className={style.errorMessage}>5글자 이내로 입력해주세요.</span>
        <Tag />
      </div>
    </div>
  );
}

export default InputBoxes;