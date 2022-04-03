import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";
import { useAuth } from "../../Context/AuthContext";
export default function ProductCard({ card }) {
    const { title, description, source, alt, rating, price, outOfStock, badgeText, discountPercent } = card;
    const actualPrice = Math.ceil(price + (discountPercent / 100) * price);
    const {
        addToCartHandler,
        isLoading: cartLoading,
        cartState: { cartList },
    } = useCart();
    const {
        addToWishList,
        removeFromWishlist,
        wishlistState: { wishList },
        isLoading: wishlistLoading,
    } = useWishlist();
    const {
        authState: { isAuth },
    } = useAuth();
    const foundInCart = cartList?.find((each) => each._id === card._id);
    const foundInWishlist = wishList?.find((each) => each._id === card._id);
    const navigate = useNavigate();
    return (
        <div className={`product-card card card-with-icon card-with-badge  ${outOfStock ? "card-overlay" : ""}`}>
            <div className="card-image">
                <img src={source} alt={alt} />
            </div>
            <div className="card-floating-btn">
                <button
                    className="btn-icon btn-icon-sm btn-icon-primary"
                    disabled={wishlistLoading}
                    onClick={() =>
                        isAuth ? (foundInWishlist ? removeFromWishlist(card) : addToWishList(card)) : navigate("/login")
                    }
                >
                    <i className={`${isAuth === true && foundInWishlist ? "fas" : "far"} fa-heart`}></i>
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
                    <button
                        className="btn btn-solid-primary"
                        disabled={cartLoading}
                        onClick={() =>
                            isAuth ? (foundInCart ? navigate("/cart") : addToCartHandler(card)) : navigate("/login")
                        }
                    >
                        {isAuth === true && foundInCart ? "Go" : "Add"} to cart
                    </button>
                </div>
            </div>
            {badgeText ? (
                <div className="card-badge">
                    <span className={badgeText}>
                        <i className="fas fa-fire"></i>
                        {badgeText}
                    </span>
                </div>
            ) : null}
            {outOfStock ? (
                <div class="card-overlay-content">
                    <span>Out of Stock</span>
                </div>
            ) : null}
        </div>
    );
}
