import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { actionTypes } from "../../Context/actionTypes";
import { useProduct } from "../../Context/ProductContext";
const { RESET_PRODUCT_FILTERS } = actionTypes;
export default function NavSearch() {
    const { productDispatchFun } = useProduct();
    const currentPage = useLocation();
    const navigate = useNavigate();

    function searchProductsFunction(e) {
        productDispatchFun({ type: RESET_PRODUCT_FILTERS });
        productDispatchFun({ type: "SEARCH_PRODUCTS", payload: { searchValue: e.target.value } });
        if (currentPage.pathname !== "/products" && e.target.value?.trim()) {
            navigate("/products");
        }
    }
    return (
        <form
            className="header-search-form flex-row-start-center"
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <input
                type="search"
                className="search-input pa-8"
                placeholder="Search..."
                onChange={searchProductsFunction}
            />
            <button type="button" className="btn-icon btn-icon-sm">
                <i className="fas fa-search"></i>
            </button>
        </form>
    );
}
