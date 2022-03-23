import axios from "axios";

export async function getSignupDetails(newUser) {
    try {
        const response = await axios.post(`/api/auth/signup`, { ...newUser });
        if (response.status === 201) {
            return response;
        }
    } catch (error) {
        return error.response;
    }
}
