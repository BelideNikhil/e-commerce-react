import axios from "axios";

export async function getWishlistService(token) {
    try {
        const response = await axios.get(`api/user/wishlist`, { headers: { authorization: token } });
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        return err.response;
    }
}
