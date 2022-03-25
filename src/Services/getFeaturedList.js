import axios from "axios";

export async function getFeaturedList() {
    try {
        const response = await axios.get("/api/products");
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        return error.response;
    }
}
