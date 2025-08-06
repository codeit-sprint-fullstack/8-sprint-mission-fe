import { useState } from 'react';
import DropDown from '@components/DropDown/DropDown';
import style from './ProductListController.module.scss';
import ic_search from '@images/ic_search.svg';

function ProductListController({ title = '', option: controls = {}, setQuery = null }) {
    const [keyword, setKeyword] = useState('');

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            setQuery?.(prev => ({ ...prev, keyword, page: 1 }));
        }
    };

    return (
        <div className={style.productListController}>
            <h2>{title}</h2>
            <div>
                {controls.search &&
                    <div className={style.searchInput}>
                        <input
                            placeholder="검색할 상품을 입력해주세요"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleSearch}
                            type="text"
                        />
                        <img src={ic_search} alt='검색 아이콘' />
                    </div>
                }
                {controls.upload && <button>상품 등록하기</button>}
                {controls.orderBy &&
                    <DropDown
                        options={[
                            { label: '최신순', value: 'recent' },
                            { label: '좋아요순', value: 'favorite' },
                        ]}
                        onChange={(opt) => setQuery?.(prev => ({ ...prev, orderBy: opt, page: 1 }))}
                    />
                }
            </div>
        </div>
    );
}

export default ProductListController;