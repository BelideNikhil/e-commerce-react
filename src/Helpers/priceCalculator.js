export function priceCalculator(cartList, couponValue) {
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
    const couponDiscount = Math.ceil((discountedPrice * couponValue) / 100);

    const grandTotal = discountedPrice - couponDiscount;

    const deliveryCharge = grandTotal > 1000 ? 0 : 100;

    return { discountedPrice, actualPrice, couponDiscount, grandTotal, deliveryCharge };
}
