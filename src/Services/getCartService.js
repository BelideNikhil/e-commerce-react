import axios from "axios";
export async function getCartService(token) {
    try {
        const response = await axios.get(`/api/user/cart`, { headers: { authorization: token } });
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        return err.response;
    }
}
