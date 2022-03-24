import axios from "axios";

export async function getCategories() {
    try {
        const response = await axios.get("/api/categories");
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        return error.response;
    }
}
