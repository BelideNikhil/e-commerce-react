import axios from "axios";

export async function deleteCartItemService(id, token) {
    try {
        const response = await axios.delete(`/api/user/cart/${id}`, { headers: { authorization: token } });
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        return err.response;
    }
}
