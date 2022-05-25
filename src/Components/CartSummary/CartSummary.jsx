import "./CartSummary.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { priceCalculator } from "../../Helpers/priceCalculator";
import { ApplyCoupon } from "../";

const couponData = [
    { id: "1", discount: 10, maxPrice: 1499 },
    { id: "2", discount: 20, maxPrice: 2499 },
];

export default function CartSummary() {
    const [showCouponModal, setCouponModal] = useState(false);
    const [couponValue, setCouponValue] = useState(0);
    const navigate = useNavigate();

    const {
        cartState: { cartList },
        cartDispatchFucntion,
    } = useCart();

    const { discountedPrice, actualPrice, couponDiscount, grandTotal } = priceCalculator(cartList, couponValue);

    useEffect(() => {
        if (!cartList.length) {
            setCouponValue(0);
        }

        cartDispatchFucntion({ type: "SET_PRICE", payload: { discountedPrice, couponValue } });
    }, [cartList, discountedPrice, couponValue]);

    return (
        <>
            <div>
                <h3 style={{ textAlign: "center" }}>Cart Summary</h3>
                <div className="flex-clmn-center-center">
                    <div className="cart-summary">
                        <div className="flex-row-spc-btw">
                            <div>
                                <i className="fas fa-tag"></i>Apply Coupons
                            </div>
                            <button
                                className="btn btn-outline-primary btn-size-sm pointer"
                                onClick={() => setCouponModal(true)}
                            >
                                APPLY
                            </button>
                        </div>
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
                                <strong>{discountedPrice}</strong>
                            </div>
                        </div>
                        <hr />
                        {couponValue ? (
                            <>
                                <div className="flex-row-spc-btw">
                                    <div className="flex-row-start-center">
                                        <small className="mr-8">Coupon Discount</small>
                                        <button className="remove-coupon-btn pointer" onClick={() => setCouponValue(0)}>
                                            Remove
                                        </button>
                                    </div>
                                    <div>
                                        <i className="fas fa-rupee-sign"></i>
                                        <small>{couponDiscount}</small>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex-row-spc-btw">
                                    <strong>Grand Total</strong>
                                    <div>
                                        <i className="fas fa-rupee-sign"></i>
                                        <strong>{discountedPrice - couponDiscount}</strong>
                                    </div>
                                </div>
                            </>
                        ) : null}
                        <div className="txt-right w-100">You save ₹ {grandTotal} on this order</div>
                    </div>
                    <button className="btn btn-solid-primary" onClick={() => navigate("/checkout")}>
                        Checkout
                    </button>
                </div>
            </div>
            {showCouponModal ? (
                <ApplyCoupon
                    setCouponModal={setCouponModal}
                    setCouponValue={setCouponValue}
                    couponData={couponData}
                    finalPrice={discountedPrice}
                    couponValue={couponValue}
                />
            ) : null}
        </>
    );
}
