import "/styles/components/bestProductCard.css";

function BestProductCard({item}) {
    const { images, description, name, price, favoriteCount } = item;

    return (
        <div className="product-card">
            <img src={images[0]} alt={description} className="product-image"/>
            <div className="padding-space"></div>
            <div className="product-details">
                <p className="product-name">{name}</p>
                <h3 className="product-price">{price.toLocaleString()}원</h3>
                <div className="product-likes">
                    <img src={"images/icons/ic_heart.svg"} className="product-likes-image" alt="likes"></img>
                    <p className="product-likes-text">{favoriteCount}</p>
                </div>
            </div>
        </div>
    );
}

export default BestProductCard;