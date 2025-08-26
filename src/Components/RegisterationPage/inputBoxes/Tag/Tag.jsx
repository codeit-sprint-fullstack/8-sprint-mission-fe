import style from './Tag.module.css';
import ic_remove from '../../../../images/ic_X.svg';

function Tag() {

  // 기능 추가 예정

  return (
    <div className={style.tag}>
      <button className={style.tagText}>
        #티셔츠
        <img src={ic_remove} alt="Remove Icon" className={style.tagRemove} />
      </button>
    </div>
  );
}

export default Tag;
