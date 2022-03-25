import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Products, Login, Signup, Cart, Wishlist, Profile } from "../Pages";
import { ResetScrollbar } from "../Components/";
import PrivateRoute from "./PrivateRoute";
import Mockman from "mockman-js";
import { useAuth } from "../Context/AuthContext";

export default function PageRoutes() {
    const {
        authState: { isAuth },
    } = useAuth();
    return (
        <ResetScrollbar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/cart" element={<Cart />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/wishlist" element={<Wishlist />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
                {!isAuth ? (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<Navigate to="/" />} />
                        <Route path="/signup" element={<Navigate to="/" />} />
                    </>
                )}
                <Route path="*" element={<Navigate replace to="/" />} />
                <Route path="/mock" element={<Mockman />} />
            </Routes>
        </ResetScrollbar>
    );
}
