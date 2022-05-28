import "./Checkout.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddress, useAuth, useCart, useOrders } from "../../Context";
import { AddressForm } from "../../Components";
import { loadScript } from "../../Helpers/loadScript";
import { useDocumentTitle } from "../../CustomHooks/useDocumentTitle";

export default function Checkout() {
    const [selectedAddress, setSelectedArress] = useState(null);
    const [showAddressModal, setAddressModal] = useState(false);
    const navigate = useNavigate();
    const {
        addressState: { addressList },
    } = useAddress();

    const {
        authState: { token, userDetails },
    } = useAuth();

    const {
        cartState: { cartList, grandTotal, deliveryCharge },
    } = useCart();

    const { placeOrderHandler } = useOrders();

    useEffect(() => {
        if (addressList.length) {
            setSelectedArress(addressList[0]);
        }
        if (!cartList.length) {
            navigate("/products");
        }
    }, [addressList, cartList]);

    useDocumentTitle("Checkout");

    async function displayRazorpay() {
        const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!response) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: "INR",
            amount: String(grandTotal + deliveryCharge) * 100,
            name: "Project 97X",
            description: "Thank you for trusting us",
            image: "/Assets/Images/favicon.webp",

            handler: async function (response) {
                const { razorpay_payment_id } = await response;
                const orderData = {
                    orderAmount: grandTotal + deliveryCharge,
                    razorpayId: razorpay_payment_id,
                    orderAddress: selectedAddress,
                };
                placeOrderHandler({ token, orderData });
                navigate(`/order-summary/${razorpay_payment_id}`);
            },
            prefill: {
                name: userDetails.firstName,
                email: userDetails.email,
                contact: "9898676721",
            },
        };

        const paymentObject = new Razorpay(options);
        paymentObject.open();
    }

    return (
        <div>
            <div className="title">Checkout</div>
            <div className="checkout-wrapper">
                <div className="checkout-address-list w-90 ma-auto">
                    <h4>Select Address</h4>
                    {addressList?.map((address) => {
                        return (
                            <div className="address mb-8 pa-12" key={address._id}>
                                <label>
                                    <div className="flex-row-start-center">
                                        <input
                                            type="radio"
                                            name="address"
                                            className="mr-8"
                                            checked={selectedAddress === address}
                                            onChange={() => setSelectedArress(address)}
                                        />
                                        <div className="address-title mt-4">{address.name}</div>
                                    </div>

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
                                </label>
                            </div>
                        );
                    })}
                    <button className="btn btn-primary add-btn" onClick={() => setAddressModal(true)}>
                        <i className="fas fa-plus"></i>Add Address
                    </button>
                    {showAddressModal ? <AddressForm setAddressModal={setAddressModal} /> : null}
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
                            <i className="fas fa-rupee-sign"></i>
                            {grandTotal + deliveryCharge}
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
                    <button className="btn btn-solid-primary w-100 m-0 mt-8" onClick={displayRazorpay}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}
