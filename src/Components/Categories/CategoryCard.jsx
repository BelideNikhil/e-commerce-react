import { useProduct } from "../../Context/ProductContext";
import { actionTypes } from "../../Context/actionTypes";
import { useNavigate } from "react-router-dom";
const { CATEGORY, RESET_PRODUCT_FILTERS } = actionTypes;
export default function CategoryCard({ card }) {
    const { productDispatchFun } = useProduct();
    const { source, title } = card;
    const navigate = useNavigate();
    function currentCategoryFilterFunction() {
        productDispatchFun({ type: RESET_PRODUCT_FILTERS });
        productDispatchFun({ type: CATEGORY, payload: { category: title, value: true } });
        navigate("/products");
    }
    return (
        <button type="button" onClick={currentCategoryFilterFunction}>
            <div className="categ-card card card-overlay">
                <div className="card-image">
                    <img src={source} alt={title} />
                </div>
                <div className="card-overlay-content">
                    <span>{title}</span>
                </div>
            </div>
        </button>
    );
}
