import { useState } from "react";
import DropDown from '../../DropDown/DropDown';
import ic_search from './ic_search.svg';
import './ProductListController.module.css';

function ProductListController() {
  const [searchWord, setSearchWord] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
        setQuery?.(prev => ({ ...prev, searchWord, page: 1 }));
    }
  };

  // const handleUpload = (e) => {

  // };

  return (
    <section className={productListController}>
      <h2>판매 중인 상품</h2>

      <div className={controlBox}>
        {controls.search &&
          <div className={searchInput}>
            <img src={ic_search} alt="검색 아이콘" onClick={handleSearch} />
            <input 
              placeholder="검색할 상품을 입력해주세요"
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        }

        {controls.upload && <button onClick={handleUpload}>상품 등록하기</button>}

        {controls.orderBy &&
          <DropDown
            options={[
              { label: '최신순', value: 'recent' },
              { label: '좋아요순', value: 'favorite' },
            ]}
            onChange={(opt) => setQuery?.(prev => ({
              ...prev,
              orderBy: opt.value,
              page: 1,
            }))}
          />
        }
      </div>
    </section>
  );
}

export default ProductListController;