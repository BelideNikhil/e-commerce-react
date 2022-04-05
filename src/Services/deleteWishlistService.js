import axios from "axios";
export async function deleteWishlistService(id, token) {
    try {
        const response = await axios.delete(`/api/user/wishlist/${id}`, {
            headers: { authorization: token },
        });
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        return err.response;
    }
}
