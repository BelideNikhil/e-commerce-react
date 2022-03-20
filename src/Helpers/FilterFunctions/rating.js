export function filterByRating(products, filters) {
    return [...products].filter((each) => (filters.RATING ? each.rating >= filters.RATING : true));
}
