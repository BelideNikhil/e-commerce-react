import axios from "axios";

export async function getLoginDetails(userData) {
    try {
        const response= await axios.post(`/api/auth/login`, { ...userData });
        if(response.status===200){
            return response
        }
    } catch (error) {
        return error.response
    }
}
