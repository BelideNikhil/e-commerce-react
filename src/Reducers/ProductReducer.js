import { filterBySearchFunction } from "../Helpers/filterBySearch";
import { filterProductsFunction } from "../Helpers/FilterFunctions";
import { actionTypes } from "../Context/actionTypes";

const {
    SORT_BY_PRICE,
    SLIDER_PRICE_VALUE,
    CATEGORY,
    RATING,
    EXCLUDE_OUT_OF_STOCK,
    ONE_DAY_DELIVERY,
    PRODUCTS_INITIAL_RENDER,
    RESET_PRODUCT_FILTERS,
    SEARCH_PRODUCTS,
} = actionTypes;
export const filters = {
    EXCLUDE_OUT_OF_STOCK: true,
    ONE_DAY_DELIVERY: false,
    categories: { GOGGLES: false, STICKERS: false, HANDGUARDS: false, TAILTIDY: false },
    SORT_BY_PRICE: "",
    RATING: 1,
    SLIDER_PRICE_VALUE: 9999,
};
function commonFunction(state, currentFilter, payload) {
    if (currentFilter === CATEGORY) {
        state = {
            ...state,
            filters: {
                ...state.filters,
                categories: { ...state.filters.categories, [payload.category]: payload.value },
            },
        };
    } else {
        state = {
            ...state,
            filters: { ...state.filters, [currentFilter]: payload },
        };
    }
    return {
        ...state,
        filteredList: filterProductsFunction(state),
    };
}
export function productReducerFun(productState, { type, payload }) {
    switch (type) {
        case SORT_BY_PRICE:
            return commonFunction(productState, type, payload.value);
        case SLIDER_PRICE_VALUE:
            return commonFunction(productState, type, payload.value);
        case RATING:
            return commonFunction(productState, type, payload.value);
        case CATEGORY:
            return commonFunction(productState, type, payload);
        case EXCLUDE_OUT_OF_STOCK:
            return commonFunction(productState, type, payload.value);
        case ONE_DAY_DELIVERY:
            return commonFunction(productState, type, payload.value);
        case PRODUCTS_INITIAL_RENDER:
            return commonFunction({ filters, prodList: payload, filteredList: payload, searchedList: payload });
        case RESET_PRODUCT_FILTERS:
            const value = commonFunction({
                filters,
                prodList: productState.prodList,
                filteredList: productState.filteredList,
                searchedList: productState.prodList,
            });
            return { ...productState, ...value };
        case SEARCH_PRODUCTS:
            let filteredSearchList = filterBySearchFunction(productState.prodList, payload.searchValue);
            productState = { ...productState, searchedList: filteredSearchList };
            return commonFunction(productState, type, payload);
        default:
            return productState;
    }
}
