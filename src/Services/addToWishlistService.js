import axios from "axios";

export async function addToWishlistService(product, token) {
    try {
        const response = await axios.post(`/api/user/wishlist`, { product }, { headers: { authorization: token } });
        if (response.status === 201) {
            return response;
        }
    } catch (err) {
        return err.response;
    }
}
