import "./Products.css";
import { useState } from "react";
import { FilterSection, ProductList } from "../../Components";
import { useProduct } from "../../Context/ProductContext";
import { actionTypes } from "../../Context/actionTypes";
const { RESET_PRODUCT_FILTERS } = actionTypes;
export default function Products() {
    const [toggleFilter, setToggleFilter] = useState(false);
    const { productDispatchFun } = useProduct();
    
    return (
        <div className="product-grid">
            <FilterSection toggleFilter={toggleFilter} />
            <ProductList />
            <div className="filter-mobile-actions flex-row-spc-btw">
                {toggleFilter ? (
                    <button onClick={() => setToggleFilter(() => false)}>Apply</button>
                ) : (
                    <button onClick={() => setToggleFilter(() => true)}>Filters</button>
                )}
                <div>|</div>
                <button onClick={()=>productDispatchFun({ type: RESET_PRODUCT_FILTERS })}>Clear</button>
            </div>
        </div>
    );
}
