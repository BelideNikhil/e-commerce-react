import { useWishlist, useCart } from "../../Context";
import { useNavigate } from "react-router-dom";

export default function WishlistCard({ card }) {
    const { title, description, source, alt, price, discountPercent, outOfStock } = card;
    const { removeFromWishlist, isLoading: cartLoading } = useWishlist();
    const { addToCartHandler, isLoading: wishlistLoading } = useCart();
    const actualPrice = Math.ceil(price + (discountPercent / 100) * price);
    const {
        cartState: { cartList },
    } = useCart();
    const navigate = useNavigate();
    const foundInCart = cartList?.find((item) => item._id === card._id);
    return (
        <div
            className={`product-card card card-with-icon ${outOfStock ? "out-of-stock card-overlay" : ""}`}
            onClick={() => navigate(`/products/${card.id}`)}
        >
            <div className="card-image">
                <img src={source} alt={alt} />
            </div>
            <div className="card-floating-btn">
                <button
                    className="btn-icon btn-icon-sm"
                    disabled={wishlistLoading}
                    onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(card);
                    }}
                >
                    <i className={"fas fa-times"}></i>
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
                            {actualPrice}
                        </span>
                        <span className="card-discount-percent">{discountPercent}%</span>
                    </div>
                </div>
                <div className="card-actions">
                    <button
                        className="btn btn-solid-primary"
                        disabled={cartLoading}
                        onClick={(e) => {
                            e.stopPropagation();
                            foundInCart ? navigate("/cart") : addToCartHandler(card);
                        }}
                    >
                        {foundInCart ? "Go" : "Add"} to cart
                    </button>
                </div>
                {outOfStock ? (
                    <div class="card-overlay-content">
                        <span>Out of Stock</span>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
