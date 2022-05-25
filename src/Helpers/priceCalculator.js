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
    const gstTotal = Math.round((discountedPrice / 100) * 18);

    const couponDiscount = Math.ceil((discountedPrice * couponValue) / 100);

    const grandTotal = actualPrice - discountedPrice + couponDiscount;

    return { discountedPrice, actualPrice, gstTotal, couponDiscount, grandTotal };
}
