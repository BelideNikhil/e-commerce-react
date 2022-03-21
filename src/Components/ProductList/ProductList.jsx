import "./ProductList.css"
import { useProduct } from "../../Context/ProductContext"
import ProductCard from "../ProductCard/ProductCard"
export default function ProductList(){
    const {productState:{filteredList}} =useProduct()
    
    return <div className="product-section">{filteredList?.map(each=>{
        return <ProductCard key={each._id} card={each}/>
    })}</div>
}