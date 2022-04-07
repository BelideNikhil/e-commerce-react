import "./FilterSection.css";
import { useProduct } from "../../Context/ProductContext";
import { actionTypes } from "../../Context/actionTypes";
const {
    SORT_BY_PRICE,
    SLIDER_PRICE_VALUE,
    CATEGORY,
    RATING,
    EXCLUDE_OUT_OF_STOCK,
    ONE_DAY_DELIVERY,
    RESET_PRODUCT_FILTERS,
} = actionTypes;
export default function FilterSection({ toggleFilter }) {
    const {
        productState: { filters },
        productDispatchFun,
    } = useProduct();
    return (
        <div className={`filter-wrapper ${toggleFilter ? "mobile-filter-active" : ""}`}>
            <aside className="filter-section">
                <div className="flex-row-spc-btw filter-title">
                    <h3>
                        Filters<i className="fas fa-filter"></i>
                    </h3>
                    <button
                        className="primary-accent clear-filter-btn pointer"
                        onClick={() => productDispatchFun({ type: RESET_PRODUCT_FILTERS })}
                    >
                        Clear
                    </button>
                </div>
                <hr></hr>
                <div className="filter-content">
                    <h4 className="filter-header">Price</h4>
                    <div className="flex-row-spc-btw">
                        <div>
                            <i className="fas fa-rupee-sign"></i>99
                        </div>
                        <div>
                            <i className="fas fa-rupee-sign"></i>9999
                        </div>
                    </div>
                    <input
                        type="range"
                        min="99"
                        max="9999"
                        step="99"
                        className="range-track"
                        value={filters.SLIDER_PRICE_VALUE}
                        onChange={(e) =>
                            productDispatchFun({
                                type: SLIDER_PRICE_VALUE,
                                payload: { value: Number(e.target.value) },
                            })
                        }
                    />
                </div>
                <hr></hr>
                <div className="filter-content">
                    <h4 className="filter-header">Sort By</h4>
                    <label>
                        <input
                            type="radio"
                            name="sort-by"
                            onChange={() =>
                                productDispatchFun({ type: SORT_BY_PRICE, payload: { value: "LOW_TO_HIGH" } })
                            }
                            checked={filters.SORT_BY_PRICE === "LOW_TO_HIGH"}
                            value="LOW_TO_HIGH"
                        />
                        Price - Low to High
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="sort-by"
                            onChange={() =>
                                productDispatchFun({ type: SORT_BY_PRICE, payload: { value: "HIGH_TO_LOW" } })
                            }
                            checked={filters.SORT_BY_PRICE === "HIGH_TO_LOW"}
                            value="HIGH_TO_LOW"
                        />
                        Price - High to Low
                    </label>
                </div>
                <hr></hr>

                <div className="filter-content">
                    <h4 className="filter-header">User Ratings</h4>
                    <label>
                        <input
                            type="radio"
                            name="rating-input"
                            onChange={(e) =>
                                productDispatchFun({ type: RATING, payload: { value: Number(e.target.value) } })
                            }
                            value="4"
                            checked={filters.RATING === 4}
                        />
                        4 star & above
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="rating-input"
                            onChange={(e) =>
                                productDispatchFun({ type: RATING, payload: { value: Number(e.target.value) } })
                            }
                            value="3"
                            checked={filters.RATING === 3}
                        />
                        3 star & above
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="rating-input"
                            onChange={(e) =>
                                productDispatchFun({ type: RATING, payload: { value: Number(e.target.value) } })
                            }
                            value="2"
                            checked={filters.RATING === 2}
                        />
                        2 star & above
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="rating-input"
                            onChange={(e) =>
                                productDispatchFun({ type: RATING, payload: { value: Number(e.target.value) } })
                            }
                            value="1"
                            checked={filters.RATING === 1}
                        />
                        1 star & above
                    </label>
                </div>
                <hr></hr>

                <div className="filter-content">
                    <h4 className="filter-header">Categories</h4>

                    <label>
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                productDispatchFun({
                                    type: CATEGORY,
                                    payload: { category: "GOGGLES", value: e.target.checked },
                                })
                            }
                            checked={filters.categories.GOGGLES}
                        />
                        Goggles
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                productDispatchFun({
                                    type: CATEGORY,
                                    payload: { category: "STICKERS", value: e.target.checked },
                                })
                            }
                            checked={filters.categories.STICKERS}
                        />
                        Stickers
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                productDispatchFun({
                                    type: CATEGORY,
                                    payload: { category: "TAILTIDY", value: e.target.checked },
                                })
                            }
                            checked={filters.categories.TAILTIDY}
                        />
                        Tail Tidy
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                productDispatchFun({
                                    type: CATEGORY,
                                    payload: { category: "HANDGUARDS", value: e.target.checked },
                                })
                            }
                            checked={filters.categories.HANDGUARDS}
                        />
                        Hand Guards
                    </label>
                </div>
                <div className="filter-content">
                    <h4 className="filter-header">Availability</h4>
                    <label>
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                productDispatchFun({
                                    type: EXCLUDE_OUT_OF_STOCK,
                                    payload: { value: e.target.checked },
                                })
                            }
                            checked={filters.EXCLUDE_OUT_OF_STOCK}
                        />
                        Exclude Out of Stock
                    </label>
                </div>
                <div className="filter-content">
                    <h4 className="filter-header">Delivery</h4>
                    <label>
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                productDispatchFun({ type: ONE_DAY_DELIVERY, payload: { value: e.target.checked } })
                            }
                            checked={filters.ONE_DAY_DELIVERY}
                        />
                        One day Delivery
                    </label>
                </div>
            </aside>
        </div>
    );
}
