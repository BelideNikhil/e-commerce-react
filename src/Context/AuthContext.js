import { createContext, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getLoginDetails, getSignupDetails } from "../Services/";

const AuthContext = createContext();
const initialAuthState = {
    isAuth: JSON.parse(localStorage.getItem("isAuth")) || false,
    loginError: "",
    signupError: "",
    token: JSON.parse(localStorage.getItem("token")) || "",
    userDetails: JSON.parse(localStorage.getItem("97xUserDetails")) || {},
};

function authReducerFunction(authState, { type, payload }) {
    switch (type) {
        case "SET_AUTH":
            return {
                isAuth: payload.auth,
                loginError: "",
                signupError: "",
                token: payload.token,
                userDetails: payload.userDetails,
            };
        case "SET_LOGIN_ERROR":
            return { ...authState, isAuth: payload.auth, loginError: payload.error };
        case "SET_SIGNUP_ERROR":
            return { ...authState, isAuth: payload.auth, signupError: payload.error };
        case "SET_AUTH_RENDER":
            return {
                isAuth: payload.auth,
                token: payload.token,
                signupError: "",
                loginError: "",
                userDetails: payload.foundUser,
            };
        case "SET_AUTH_LOGOUT":
            return { isAuth: false, token: "", signupError: "", loginError: "", userDetails: {} };
        default:
            return authState;
    }
}

function AuthProvider({ children }) {
    const [authState, authDispatchFuntion] = useReducer(authReducerFunction, initialAuthState);
    const navigate = useNavigate();

    const userLoginHandler = async (userData) => {
        const { status, data } = await getLoginDetails(userData);
        if (status === 200) {
            authDispatchFuntion({
                type: "SET_AUTH",
                payload: {
                    auth: true,
                    userDetails: data.foundUser,
                    token: data.encodedToken,
                },
            });

            localStorage.setItem("token", JSON.stringify(data.encodedToken));
            localStorage.setItem("isAuth", JSON.stringify(true));
            localStorage.setItem("97xUserDetails", JSON.stringify(data.foundUser));

            navigate("/");
        } else {
            authDispatchFuntion({ type: "SET_LOGIN_ERROR", payload: { auth: false, error: data.errors[0] } });
        }
    };

    const signupHandler = async (newUserData) => {
        const { status, data } = await getSignupDetails(newUserData);
        if (status === 201) {
            authDispatchFuntion({
                type: "SET_AUTH",
                payload: { auth: true, token: data.encodedToken, userDetails: data.createdUser },
            });

            localStorage.setItem("token", JSON.stringify(data.encodedToken));
            localStorage.setItem("isAuth", JSON.stringify(true));
            localStorage.setItem("97xUserDetails", JSON.stringify(data.createdUser));

            navigate("/");
        } else {
            authDispatchFuntion({ type: "SET_SIGNUP_ERROR", payload: { auth: false, error: data.errors } });
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem("isAuth");
        localStorage.removeItem("token");
        localStorage.removeItem("97xUserDetails");
        authDispatchFuntion({ type: "SET_AUTH_LOGOUT" });
        navigate("/");
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
