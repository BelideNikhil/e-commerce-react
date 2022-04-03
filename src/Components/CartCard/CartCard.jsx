import "./CartCard.css";
import { useCart } from "../../Context/CartContext";
export default function CartCard({ card }) {
    const { _id, title, source, alt, price, description, qty, discountPercent } = card;
    const { updateQtyHandler, deleteFromCartHandler, moveToWishlist, isLoading: cartLoading } = useCart();
    const actualPrice = Math.ceil(price + (discountPercent / 100) * price);
    return (
        <div className="card cart-card card-with-icon">
            <div className="card-image">
                <img src={source} alt={alt} />
            </div>
            <div className="card-floating-btn">
                <button
                    className="btn-icon btn-icon-sm"
                    disabled={cartLoading}
                    onClick={() => deleteFromCartHandler(_id)}
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <div className="card-body">
                <div className="card-title">
                    <h4>{title}</h4>
                    <div>{description}</div>
                </div>
                <div className="cart-qty-wrapper flex-row-center-center">
                    <button
                        className="btn-icon btn-icon-sm"
                        disabled={cartLoading}
                        onClick={() => (qty === 1 ? deleteFromCartHandler(_id) : updateQtyHandler(_id, "decrement"))}
                    >
                        <i className="fas fa-minus"></i>
                    </button>
                    <b className="ma-8">{qty}</b>
                    <button
                        className="btn-icon btn-icon-sm"
                        disabled={cartLoading}
                        onClick={() => updateQtyHandler(_id, "increment")}
                    >
                        <i className="fas fa-plus"></i>
                    </button>
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
                        className="btn btn-outline-primary"
                        disabled={cartLoading}
                        onClick={() => moveToWishlist(card)}
                    >
                        Move to Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
}
