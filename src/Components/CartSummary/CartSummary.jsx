import { useCart } from "../../Context/CartContext";
import "./CartSummary.css";
export default function CartSummary() {
    const {
        cartState: { cartList },
    } = useCart();
    const discountedPrice = Math.round(
        cartList.reduce((total, current) => total + Number(current.price * current.qty), 0)
    );
    const actualPrice = Math.round(
        cartList.reduce(
            (total, current) =>
                total + Number((current.price + (current.discountPercent / 100) * current.price) * current.qty),
            0
        )
    );
    const gstTotal = Math.round((discountedPrice / 100) * 18);
    return (
        <div>
            <h3 style={{ textAlign: "center" }}>Cart Summary</h3>
            <div className="flex-clmn-center-center">
                <div className="cart-summary">
                    <h4>Price Details</h4>
                    <hr />
                    <div className="flex-row-spc-btw">
                        <div>
                            Cart Total <strong>( {cartList?.length} Items)</strong>
                        </div>
                        <div>
                            <i className="fas fa-rupee-sign"></i>
                            {actualPrice}
                        </div>
                    </div>
                    <div className="flex-row-spc-btw">
                        <div>Discount</div>
                        <div>
                            <i className="fas fa-rupee-sign"></i>
                            {actualPrice - discountedPrice}
                        </div>
                    </div>
                    <div className="flex-row-spc-btw">
                        <div>GST</div>
                        <div>
                            <i className="fas fa-rupee-sign"></i>
                            {gstTotal}
                        </div>
                    </div>

                    <div className="flex-row-spc-btw">
                        <div>Shipping Charges</div>
                        <div className="secondary-accent">
                            {discountedPrice > 500 ? (
                                "FREE"
                            ) : (
                                <div>
                                    <i className="fas fa-rupee-sign"></i> 100
                                </div>
                            )}
                        </div>
                    </div>
                    <hr />
                    <div className="flex-row-spc-btw">
                        <strong>Total Amount</strong>
                        <div>
                            <i className="fas fa-rupee-sign"></i>
                            <strong>{discountedPrice + gstTotal}</strong>
                        </div>
                    </div>
                    <hr />
                    <div className="flex-row-spc-btw">
                        <div>Your Savings</div>
                        <div>
                            <i className="fas fa-rupee-sign"></i>
                            {actualPrice - discountedPrice}
                        </div>
                    </div>
                </div>
                <button className="btn btn-solid-primary">Place Order</button>
            </div>
        </div>
    );
}
