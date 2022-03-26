import axios from "axios";

export async function updateCartQtyService(id, type, token) {
    try {
        const response = await axios.post(
            `api/user/cart/${id}`,
            {
                action: {
                    type,
                },
            },
            { headers: { authorization: token } }
        );
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        return err.response;
    }
}
