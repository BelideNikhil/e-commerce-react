import "./Products.css";
import { useState } from "react";
import { FilterSection, ProductList } from "../../Components";
import { useProduct } from "../../Context/ProductContext";
export default function Products() {
    const [toggleFilter, setToggleFilter] = useState(false);
    const { productDispatchFun } = useProduct();
    function resetFiltersFunction() {
        productDispatchFun({ type: "RESET_FILTERS" });
        setToggleFilter(() => false);
    }
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
                <button onClick={resetFiltersFunction}>Clear</button>
            </div>
        </div>
    );
}
