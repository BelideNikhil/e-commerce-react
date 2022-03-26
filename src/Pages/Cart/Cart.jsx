import "./Cart.css";
import { useCart } from "../../Context/CartContext";
import CartCard from "../../Components/CartCard/CartCard";
import CartSummary from "../../Components/CartSummary/CartSummary";
export default function Cart() {
    const {
        cartState: { cartList },
        isLoading,
    } = useCart();
    return (
        <div>
            <div className="title">My Cart ({cartList?.length})</div>
            <div className="cart-wrapper">
                <div className="cart-list flex-clmn-center-center">
                    {cartList?.map((each) => {
                        return <CartCard card={each} key={each._id} />;
                    })}
                </div>
                {cartList?.length > 0 ? <CartSummary /> : null}
            </div>
        </div>
    );
}
