import "./ApplyCoupon.css";

export default function ApplyCoupon({ setCouponModal, setCouponValue, couponData, finalPrice, couponValue }) {
    return (
        <div className="coupon-wrapper flex-clmn-center-center">
            <div className="coupon-content w-90 pa-24 ma-auto">
                <div className="flex-row-spc-btw mb-16">
                    <h4>Apply Coupon</h4>
                    <button className="btn-icon m-0" onClick={() => setCouponModal(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div>
                    {couponData?.map((item) => {
                        return (
                            <label
                                className={`form-label flex-row-start-center coupon-label pointer mb-16 pa-8 ${
                                    item.maxPrice > finalPrice ? "not-applicable" : ""
                                }`}
                                key={item.id}
                            >
                                <input
                                    type="radio"
                                    className="form-input mr-8"
                                    name="coupon"
                                    value={item.discount}
                                    checked={couponValue === item.discount && finalPrice > item.maxPrice}
                                    disabled={finalPrice < item.maxPrice}
                                    onChange={(e) => setCouponValue(Number(e.target.value))}
                                />
                                <div>
                                    {item.discount}% off on purchase of Rs.{item.maxPrice}
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
