import axios from "axios";

export async function getProductList() {
    try {
        const response = await axios.get("/api/products");
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        return err.message;
    }
}
