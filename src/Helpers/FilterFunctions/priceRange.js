export function priceRangeFunction(products, filterPrice) {
    return [...products].filter((each) => Number(each.price) <= filterPrice.SLIDER_PRICE_VALUE);
}
