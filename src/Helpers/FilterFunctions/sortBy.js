export function sortByPrice(productList, filters) {
    if (filters.SORT_BY_PRICE === "LOW_TO_HIGH") {
        return [...productList].sort((a, b) => a.price - b.price);
    }
    if (filters.SORT_BY_PRICE === "HIGH_TO_LOW") {
        return [...productList].sort((a, b) => b.price - a.price);
    }
    return productList;
}
