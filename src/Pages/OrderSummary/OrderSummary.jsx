import "./OrderSummary.css";
import { useNavigate, useParams } from "react-router-dom";
import { useOrders } from "../../Context";
import { useDocumentTitle } from "../../CustomHooks/useDocumentTitle";

export default function OrderSummary() {
    const {
        orderState: { ordersList },
    } = useOrders();
    const { orderId } = useParams();
    const navigate = useNavigate();
    useDocumentTitle("Summary");

    const orderDetails = ordersList?.find((order) => order.razorpayId === orderId);

    return (
        <>
            <div className="title">Order Summmary</div>
            {orderDetails ? (
                <>
                    <div className="order-summary-wrapper">
                        <div className="order-summary">
                            <div className="order-summary-title">Order Placed.</div>
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
                    <div className="flex-row-center-center">
                        <button className="btn btn-solid-primary" onClick={() => navigate("/profile/orders")}>
                            View Order History
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex-clmn-center-center">
                    <h3 className="txt-center mt-16">No Details found Related to this order</h3>
                    <button className="btn btn-solid-primary" onClick={() => navigate("/products")}>
                        Shop Now
                    </button>
                </div>
            )}
        </>
    );
}
