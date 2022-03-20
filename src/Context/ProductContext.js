import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { filterProductsFunction } from "../Helpers/FilterFunctions";
const filters = {
    EXCLUDE_OUT_OF_STOCK: true,
    ONE_DAY_DELIVERY: false,
    categories: { GOGGLES: false, STICKERS: false, HANDGUARDS: false, TAILTIDY: false },
    SORT_BY_PRICE: "",
    RATING: 1,
    SLIDER_PRICE_VALUE: 9999,
};
const initialProductState = { prodList: [], filters, filteredList: [] };
const ProductContext = createContext();

function commonFunction(state, currentFilter, payload) {
    if (currentFilter === "CATEGORY") {
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
function productReducerFun(productState, { type, payload }) {
    switch (type) {
        case "SORT_BY_PRICE":
            return commonFunction(productState, type, payload.value);
        case "SLIDER_PRICE_VALUE":
            return commonFunction(productState, type, payload.value);
        case "RATING":
            return commonFunction(productState, type, payload.value);
        case "CATEGORY":
            return commonFunction(productState, type, payload);
        case "EXCLUDE_OUT_OF_STOCK":
            return commonFunction(productState, type, payload.value);
        case "ONE_DAY_DELIVERY":
            return commonFunction(productState, type, payload.value);
        case "INITIAL_RENDER":
            return commonFunction({ filters, prodList: payload, filteredList: payload });
        case "RESET_FILTERS":
            return commonFunction({
                filters,
                prodList: productState.prodList,
                filteredList: productState.filteredList,
            });
        default:
            return productState;
    }
}

function ProductProvider({ children }) {
    const [productState, productDispatchFun] = useReducer(productReducerFun, initialProductState);

    useEffect(() => {
        (async () => {
            try {
                const { data, status } = await axios.get("/api/products");
                if (status === 200) {
                    productDispatchFun({ type: "INITIAL_RENDER", payload: data.products });
                }
            } catch (err) {
                console.log(err.message);
            }
        })();
    }, []);

    return <ProductContext.Provider value={{ productState, productDispatchFun }}>{children}</ProductContext.Provider>;
}

function useProduct() {
    return useContext(ProductContext);
}

export { useProduct, ProductProvider };
