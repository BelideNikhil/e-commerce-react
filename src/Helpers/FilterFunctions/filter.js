import { sortByPrice, priceRangeFunction, filterByRating, filterByCategories } from "./index";

export function filterProductsFunction({ filters, searchedList }) {
    let filteredByCategory = filterByCategories(searchedList, filters);
    let filteredByPriceValue = priceRangeFunction(filteredByCategory, filters);
    let sortedBy = sortByPrice(filteredByPriceValue, filters);
    let ratedBy = filterByRating(sortedBy, filters);

    return ratedBy
        .filter((eachProduct) => (filters.EXCLUDE_OUT_OF_STOCK ? !eachProduct.outOfStock : true))
        .filter((eachProduct) => (filters.ONE_DAY_DELIVERY ? eachProduct.oneDayDelivery : true));
}
