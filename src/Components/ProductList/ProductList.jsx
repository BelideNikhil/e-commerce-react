import "./ProductList.css";
import { useProduct } from "../../Context/ProductContext";
import ProductCard from "../ProductCard/ProductCard";
import { Loading } from "../index";
export default function ProductList() {
    const {
        productState: { filteredList },
        isLoading,
    } = useProduct();
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="product-section">
                    {filteredList?.map((each) => {
                        return <ProductCard key={each._id} card={each} />;
                    })}
                </div>
            )}
        </div>
    );
}
