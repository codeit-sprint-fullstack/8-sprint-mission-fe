import { useState } from "react";
import DropDown from '../../DropDown/DropDown';
import ic_search from '../../../images/ic_search.svg';
import style from './ProductListController.module.css';

function ProductListController({ option: controls = {}, setQuery = null }) {
  const [keyword, setSearchWord] = useState('');

  const handleSearch = (e) => {  // 검색 결과가 없을 때 코드 작성해보기
    if (e.key === 'Enter' || e.type === 'click') {
        setQuery?.(prev => ({ ...prev, keyword, page: 1 }));
    }
  };

  // const handleUpload = (e) => {

  // };

  return (
    <section className={style.productListController}>
      <h2>판매 중인 상품</h2>

      <div className={style.controlBox}>
        {controls.search &&
          <div className={style.searchInputBox}>
            <img src={ic_search} alt="검색 아이콘" onClick={handleSearch} />
            <input 
              placeholder="검색할 상품을 입력해주세요"
              type="text"
              value={keyword}
              onChange={(e) => setSearchWord(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        }

        {controls.upload && <button>상품 등록하기</button>}
        {/* onClick={handleUpload} */}

        {controls.orderBy &&
          <DropDown
            options={[
              { label: '최신순', value: 'recent' },
              { label: '좋아요순', value: 'favorite' },
            ]}
            onChange={(value) => setQuery?.(prev => ({
              ...prev,
              orderBy: value,
              page: 1,
            }))}
          />
        }
      </div>
    </section>
  );
}

export default ProductListController;