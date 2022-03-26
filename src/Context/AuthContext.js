import { createContext, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getLoginDetails, getSignupDetails } from "../Services/";

const AuthContext = createContext();
const initialAuthState = {
    isAuth: JSON.parse(localStorage.getItem("isAuth")) || false,
    loginError: "",
    signupError: "",
    token: JSON.parse(localStorage.getItem("token")) || "",
};

function authReducerFunction(authState, { type, payload }) {
    switch (type) {
        case "SET_AUTH":
            return {
                isAuth: payload.auth,
                loginError: "",
                signupError: "",
                token: payload.token,
            };
        case "SET_LOGIN_ERROR":
            return { ...authState, isAuth: payload.auth, loginError: payload.error };
        case "SET_SIGNUP_ERROR":
            return { ...authState, isAuth: payload.auth, signupError: payload.error };
        case "SET_AUTH_RENDER":
            console.log(payload);
            return { isAuth: payload.auth, token: payload.token, signupError: "", loginError: "" };
        case "SET_AUTH_LOGOUT":
            return { isAuth: false, token: "", signupError: "", loginError: "" };
        default:
            return authState;
    }
}
function localStorageSetter(status, data) {
    if (status === 200 || status === 201) {
        localStorage.setItem("token", JSON.stringify(data.encodedToken));
        localStorage.setItem("isAuth", JSON.stringify(true));
    } else {
        localStorage.setItem("token", JSON.stringify(""));
        localStorage.setItem("isAuth", JSON.stringify(false));
    }
}
function AuthProvider({ children }) {
    const [authState, authDispatchFuntion] = useReducer(authReducerFunction, initialAuthState);
    const navigate = useNavigate();
    const userLoginHandler = async (userData) => {
        const { status, data } = await getLoginDetails(userData);
        if (status === 200) {
            localStorageSetter(200, data);
            authDispatchFuntion({
                type: "SET_AUTH",
                payload: { auth: true, userData: data.foundUser, token: data.encodedToken },
            });
            navigate("/");
        } else {
            localStorageSetter(status);
            authDispatchFuntion({ type: "SET_LOGIN_ERROR", payload: { auth: false, error: data.errors[0] } });
        }
    };
    const signupHandler = async (newUserData) => {
        const { status, data } = await getSignupDetails(newUserData);
        if (status === 201) {
            localStorageSetter(status, data);
            authDispatchFuntion({
                type: "SET_AUTH",
                payload: { auth: true, token: data.encodedToken },
            });
            navigate("/");
        } else {
            localStorageSetter(status);
            authDispatchFuntion({ type: "SET_SIGNUP_ERROR", payload: { auth: false, error: data.errors } });
        }
    };
    const logoutHandler = () => {
        localStorage.removeItem("isAuth");
        localStorage.removeItem("token");
        authDispatchFuntion({ type: "SET_AUTH_LOGOUT" });
    };
    return (
        <AuthContext.Provider
            value={{ userLoginHandler, signupHandler, logoutHandler, authState, authDispatchFuntion }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { useAuth, AuthProvider };
