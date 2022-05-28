import "./Orders.css";
import { useEffect } from "react";
import { useAuth, useOrders } from "../../Context";
import { Loading } from "../index";
import { useNavigate } from "react-router-dom";

export default function Orders() {
    const {
        authState: { token },
    } = useAuth();
    const {
        getOrdersList,
        orderState: { ordersList, isLoading },
    } = useOrders();

    const navigate = useNavigate();

    useEffect(() => {
        getOrdersList(token);
        document.title = "Order History";
    }, []);

    return (
        <div className="orders-wrapper">
            {isLoading ? (
                <Loading />
            ) : ordersList?.length > 0 ? (
                ordersList.map((orderDetails) => {
                    return (
                        <div className="order-card" key={orderDetails?.orderId}>
                            <div className="order-summary mb-12">
                                <h4>Order Placed.</h4>
                                <div className="order-details">Order ID # {orderDetails?.orderId}</div>
                                <div className="order-details">Oder Total: ₹ {orderDetails?.orderAmount}</div>
                                <div className="order-details">
                                    Placed On: {orderDetails?.orderPlacedDate.split("T")[0]}
                                </div>
                                <div>
                                    <div className="order-details">Deliver To: {orderDetails?.orderAddress.name}</div>
                                    <div>{orderDetails?.orderAddress.locality},</div>
                                    <span>{orderDetails?.orderAddress.city},</span>
                                    <span>{orderDetails?.orderAddress.state},</span>
                                    <span>{orderDetails?.orderAddress.pincode}</span>
                                </div>
                            </div>
                            <div>
                                {orderDetails?.orderItems?.map((item) => {
                                    return (
                                        <div
                                            className="order-summary-card pointer"
                                            key={item._id}
                                            role="button"
                                            onClick={() => navigate(`/products/${item.id}`)}
                                        >
                                            <img src={item.source} alt={item.alt} className="image-responsive" />
                                            <div className="pa-8">
                                                <h4 className="mb-4">{item.title}</h4>
                                                <h5 className="mb-4">{item.description}</h5>
                                                <div className="mb-4">Quantity: {item.qty}</div>
                                                <div className="mb-4">Price: ₹{item.price}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })
            ) : (
                <h4 className="txt-center">No Orders placed yet</h4>
            )}
        </div>
    );
}
