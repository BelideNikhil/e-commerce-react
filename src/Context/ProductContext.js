import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { productReducerFun, filters } from "../Reducers/ProductReducer";
import { actionTypes } from "./actionTypes";
import { getProductList } from "../Services";
const { PRODUCTS_INITIAL_RENDER } = actionTypes;

const initialProductState = {
    prodList: [],
    filters,
    filteredList: [],
    featuredList: [],
    searchedList: [],
};
const ProductContext = createContext();

function ProductProvider({ children }) {
    const [productState, productDispatchFun] = useReducer(productReducerFun, initialProductState);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const { status, data } = await getProductList();
            if (status === 200) {
                productDispatchFun({ type: PRODUCTS_INITIAL_RENDER, payload: data.products });
                setIsLoading(false);
            }
        })();
    }, []);

    return (
        <ProductContext.Provider value={{ productState, productDispatchFun, isLoading }}>
            {children}
        </ProductContext.Provider>
    );
}

function useProduct() {
    return useContext(ProductContext);
}

export { useProduct, ProductProvider };
