import style from './ControllerBox.module.css';

function ControllerBox() {

  // 기능 추가 예정

  return (
    <div className={style.container}>
      <h2>상품 등록하기</h2>
      <button className={style.registerButton}>등록</button>
    </div>
  );
}

export default ControllerBox;