import axios from "axios";

export async function addToCartService(currentCard, token) {
    try {
        const response = await axios.post(
            `/api/user/cart`,
            { product: currentCard },
            { headers: { authorization: token } }
        );
        if (response.status === 201) {
            return response;
        }
    } catch (err) {
        return err.response;
    }
}
