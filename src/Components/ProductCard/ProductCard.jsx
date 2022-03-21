import "./ProductCard.css";

export default function ProductCard({ card }) {
    const { title, description, source, alt, rating, price, outOfStock } = card;
    if (outOfStock) {
        console.log(outOfStock, title);
    }
    return (
        <div className={`product-card card card-with-icon ${outOfStock ? "card-overlay" : ''}`}>
            <div className="card-image">
                <img src={source} alt={alt} />
            </div>
            <div className="card-floating-btn">
                <button className="btn-icon btn-icon-sm">
                    <i className="far fa-heart"></i>
                </button>
            </div>
            <div className="card-body">
                <div className="card-title">
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>
                <div className="flex-row-spc-btw">
                    <div className="card-pricing">
                        <span className="card-selling-price">
                            <span>
                                <i className="fas fa-rupee-sign"></i>
                            </span>
                            {price}
                        </span>
                        <span className="card-original-price">
                            <span>
                                <i className="fas fa-rupee-sign"></i>
                            </span>
                            1499
                        </span>
                        <span className="card-discount-percent">50%</span>
                    </div>
                    <div className="rating-container rating-short">
                        <span className="rating-user-avg">
                            {rating}
                            <span className="rating-icon">
                                <i className="fas fa-star"></i>
                            </span>
                        </span>
                    </div>
                </div>
                <div className="card-actions">
                    <button className="btn btn-solid-primary"> Add to cart</button>
                </div>
            </div>
            {outOfStock?<div class="card-overlay-content">
                <span>Out of Stock</span>
            </div>:null}
        </div>
    );
}
