import style from './inputBoxes.module.css';
import Tag from './Tag/Tag';

function InputBoxes() {

  // const name = ;

  return (
    <section> 
      <div className={style.container}>
        <h2>상품명</h2>
        <input type="text" placeholder='상품명을 입력해주세요.' />
      </div>

      <div className={style.container}>
        <h2>상품 소개</h2>
        <input type="text" className={style.introduceInput} placeholder='상품 소개를 입력해주세요.' />
      </div>

      <div className={style.container}>
        <h2>판매가격</h2>
        <input type="text" placeholder='판매가격을 입력해주세요.' />
      </div>

      <div className={style.container}>
        <h2>태그</h2>
        <input type="text" placeholder='태그를 입력해주세요.' />
        <Tag />
      </div>
    </section>
  );
}

export default InputBoxes;