import searchIcon from '/images/items/ic_search.svg';
import arrowDownIcon from '/images/items/ic_arrow_down.svg';

//일단 order를 구현은 해놓았지만, 작동하는지는 나중에 확인하고 고치겠습니다.
function ProductHeadline({ deviceType, order, onChangeOrder, search, onChangeSearch }){
    //모바일일 때만, 상단 헤드라인 양식을 바꿉니다.
    return (
        <div className='section-headline'>
            <div className='title'>
                <p>판매 중인 상품</p>
                {deviceType=='mobile'&& <button>상품 등록하기</button>}
            </div>  
            <div>
                <div className='search-box'>
                    <img className='search-icon' src={searchIcon}/>
                    <input 
                        name="search-input" 
                        placeholder='검색할 상품을 입력해주세요'
                        value={search}
                        onChange={onChangeSearch}
                    />
                </div>  
                {deviceType!='mobile'&& <button>상품 등록하기</button>}
                <div className='dropdown'>
                    <select value={order} name="order" onChange={onChangeOrder}>
                        <option value="recent">최신순</option>
                        <option value="favorite">좋아요순</option>
                    </select>
                    {deviceType!='mobile'&& <img className='dropdown-icon' src={arrowDownIcon}/>}
                </div>
            </div>
        </div>
    );
}

export default ProductHeadline;