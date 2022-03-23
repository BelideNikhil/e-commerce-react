import { createContext, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getLoginDetails, getSignupDetails } from "../Services/";

const AuthContext = createContext();
const initialAuthState = {
    isAuth: JSON.parse(localStorage.getItem("isAuth")) || false,
    userData: {},
    loginError: "",
    signupError: "",
};

function authReducerFunction(authState, { type, payload }) {
    switch (type) {
        case "SET_AUTH":
            return { ...authState, isAuth: payload.auth, loginError: "", signupError: "", userData: payload.userData };
        case "SET_LOGIN_ERROR":
            return { ...authState, isAuth: payload.auth, loginError: payload.error };
        case "SET_SIGNUP_ERROR":
            return { ...authState, isAuth: payload.auth, signupError: payload.error };
        default:
            return authState;
    }
}
function lcStorgaeSetter(status, data) {
    if (status === 200 || status === 201) {
        localStorage.setItem("token", data.encodedToken);
        localStorage.setItem("isAuth", true);
    } else {
        localStorage.setItem("token", null);
        localStorage.setItem("isAuth", false);
    }
}
function AuthProvider({ children }) {
    const [authState, authDispatchFuntion] = useReducer(authReducerFunction, initialAuthState);
    const navigate = useNavigate();

    const userLoginHandler = async (userData) => {
        const { status, data } = await getLoginDetails(userData);
        if (status === 200) {
            lcStorgaeSetter(200, data);
            authDispatchFuntion({ type: "SET_AUTH", payload: { auth: true, userData: data.foundUser } });
            navigate("/")
        } else {
            lcStorgaeSetter(status);
            authDispatchFuntion({ type: "SET_LOGIN_ERROR", payload: { auth: false, error: data.errors[0] } });
        }
    };
    const signupHandler = async (newUserData) => {
        console.log(newUserData)
        const { status, data } =await getSignupDetails(newUserData);
        console.log(status,data,"signup")
        if (status === 201) {
            lcStorgaeSetter(status, data);
            authDispatchFuntion({ type: "SET_AUTH", payload: { auth: true, userData: data.createdUser } });
            navigate("/")
        } else {
            lcStorgaeSetter(status);
            authDispatchFuntion({ type: "SET_SIGNUP_ERROR", payload: { auth: false, error: data.errors } });
        }
    };

    return (
        <AuthContext.Provider value={{ userLoginHandler, signupHandler, authState, authDispatchFuntion }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { useAuth, AuthProvider };
