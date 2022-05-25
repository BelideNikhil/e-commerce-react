import "./Checkout.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddress, useCart } from "../../Context";

export default function Checkout() {
    const [selectedAddress, setSelectedArress] = useState(null);
    const navigate = useNavigate();
    const {
        addressState: { addressList },
    } = useAddress();

    const {
        cartState: { cartList, discountedPrice, couponValue },
    } = useCart();

    useEffect(() => {
        if (addressList.length) {
            setSelectedArress(addressList[0]);
        } else {
            navigate("/products");
        }
    }, [addressList]);

    return (
        <div>
            <div className="title">Checkout</div>
            <div className="checkout-wrapper">
                <div className="checkout-address-list w-90 ma-auto">
                    <h4>Select Address</h4>
                    {addressList?.map((address) => {
                        return (
                            <div className="address mb-8 pa-12" key={address._id}>
                                <label className="flex-row-start-center">
                                    <input
                                        type="radio"
                                        name="address"
                                        className="mr-8"
                                        checked={selectedAddress === address}
                                        onChange={() => setSelectedArress(address)}
                                    />
                                    <div className="address-title mt-4">{address.name}</div>
                                </label>
                                <div className="address-text">{address.locality}</div>
                                <div>
                                    <span className="address-text">{address.city}, </span>
                                    <span className="address-text">{address.pincode}</span>
                                </div>
                                <div>
                                    <span className="address-text">India, </span>
                                    <span className="address-text">{address.state}</span>
                                </div>
                                <div className="address-text">Phone: {address.phoneNumber}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="checkout-summary pa-24">
                    <h4 className="mb-8 txt-center">Order Details</h4>
                    <hr />
                    <div className="mt-8 flex-row-spc-btw">
                        <b>Item</b>
                        <b>Qty</b>
                    </div>
                    {cartList?.map((item) => {
                        return (
                            <div className="mt-4 flex-row-spc-btw" key={item.id}>
                                <div className="checkout-item-title">{item.title}</div>
                                <div>{item.qty}</div>
                            </div>
                        );
                    })}
                    <hr />
                    <h4 className="mb-8 mt-8 txt-center">Price Details</h4>
                    <hr />
                    <div className="flex-row-spc-btw mb-8">
                        <b>Grand Total</b>
                        <b>
                            {couponValue
                                ? Math.floor(discountedPrice - (discountedPrice * couponValue) / 100)
                                : discountedPrice}
                        </b>
                    </div>
                    <hr />
                    <h4 className="mb-8 mt-8 txt-center">Deliver To</h4>
                    <hr />
                    {selectedAddress ? (
                        <div>
                            <div>{selectedAddress.name}</div>
                            <div>
                                <small>{selectedAddress.locality},</small>
                                <small>{selectedAddress.city},</small>
                                <small>{selectedAddress.state},</small>
                                <small>{selectedAddress.pincode}</small>
                            </div>
                        </div>
                    ) : null}
                    <button className="btn btn-solid-primary w-100 m-0 mt-8">Place Order</button>
                </div>
            </div>
        </div>
    );
}
