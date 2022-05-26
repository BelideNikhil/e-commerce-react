import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context";
import { CartSummary, CartCard } from "../../Components";
import { useDocumentTitle } from "../../CustomHooks/useDocumentTitle";

export default function Cart() {
    const navigate = useNavigate();
    const {
        cartState: { cartList },
    } = useCart();

    useDocumentTitle("Shopping Cart");
    return (
        <div>
            <div className="title">My Cart {cartList?.length ? `(${cartList.length})` : null}</div>
            {cartList?.length ? (
                <div className="cart-wrapper">
                    <div className="cart-list flex-clmn-center-center">
                        {cartList?.map((each) => {
                            return <CartCard card={each} key={each._id} />;
                        })}
                    </div>
                    {cartList?.length > 0 ? <CartSummary /> : null}
                </div>
            ) : (
                <div className="flex-clmn-center-center mt-24">
                    <h4 className="mb-8">Your Cart is Empty</h4>
                    <button className="btn btn-solid-primary" onClick={() => navigate("/products")}>
                        Shop Now
                    </button>
                </div>
            )}
        </div>
    );
}
