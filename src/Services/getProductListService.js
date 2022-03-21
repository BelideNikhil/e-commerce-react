import axios from "axios";

export async function getProductList(){
    try {
        const { data, status } = await axios.get("/api/products");
        if (status === 200) {
            return data.products
        }
    } catch (err) {
        console.log(err.message);
    }
}