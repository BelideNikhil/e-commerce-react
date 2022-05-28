import { useNavigate } from "react-router-dom";
import { useAuth, useCart } from "../../Context";

export default function FeaturedCard({ card }) {
    const { source, title, description } = card;
    const navigate = useNavigate();
    const {
        cartState: { cartList, isLoading },
        addToCartHandler,
    } = useCart();
    const {
        authState: { isAuth },
    } = useAuth();

    const foundInCart = cartList?.find((each) => each._id === card._id);
    return (
        <div className="card featured-card" onClick={() => navigate(`/products/${card.id}`)}>
            <div className="card-image">
                <img src={source} alt="bestSeller" />
            </div>
            <div className="card-title">
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
            <button
                className="btn btn-outline-primary btn-featured"
                disabled={isLoading}
                onClick={(e) => {
                    e.stopPropagation();
                    isAuth ? (foundInCart ? navigate("/cart") : addToCartHandler(card)) : navigate("/login");
                }}
            >
                {isAuth === true && foundInCart ? "Go" : "Add"} to cart
            </button>
        </div>
    );
}
