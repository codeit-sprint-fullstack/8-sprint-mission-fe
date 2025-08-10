import broomstick from "/images/items/products/broomstick.png";
import cloth from '/images/items/products/cloth.png';
import comestick from '/images/items/products/comestic.png';
import doll from '/images/items/products/doll.png';
import grill from '/images/items/products/grill.png';
import hanger from '/images/items/products/hanger.png';
import jacket from '/images/items/products/jacket.png';
import laundry from '/images/items/products/laundry.png';
import mirror from '/images/items/products/mirror.png';
import note from '/images/items/products/note.png';
import robot from '/images/items/products/robot.png';

import heartIcon from '/images/items/ic_heart.svg';

const itemImgList = [broomstick, cloth, comestick, doll, grill, hanger, jacket, laundry, mirror, note, robot];
const randomImg = (id) => {
    const Img = itemImgList[id%10];
    return (
        {
            backgroundImage: `url('${Img}')`,
            backgroundRepeat: 'no-repeat',  
            backgroundSize: '150%',
            borderRadius: '10px',
            backgroundPosition: 'center',
        }
    )
}

function Product({item}){
    const style = randomImg(item.id);
    return (
        <div className="product">
            {/* 리스폰스 이미지가 없는 url이어서 임의로 랜덤 이미지를 넣었습니다.*/}
            <div className="image-box" style={style}></div>
            <div className='description'>
                <p className="name">{item.name}</p>
                <p className="price">{item.price.toLocaleString()+'원'}</p>
                {/* 어째선지 리스폰스에 좋아요 수가 없습니다. 임의로 240을 넣었습니다.*/}
                <div className="favorite">
                    <button>
                        <img src={heartIcon}/>
                    </button>
                    <p>{240}</p> 
                </div>
            </div>
        </div>
    );
}

function ProductList({ items }){240
     
    return (
        <ul className='list-grid'>
            {items.map((item) => {  
                return (
                    <li key={item.id}>
                        <Product item={item}/>
                    </li>
                );
            })}
        </ul>
    );
}

export default ProductList;