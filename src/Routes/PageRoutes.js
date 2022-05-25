import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Products, Login, Signup, Cart, Wishlist, Profile, NotFound, SingleProduct, Checkout } from "../Pages";
import { ResetScrollbar, AddressList, Orders, UserDetails } from "../Components/";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "../Context/AuthContext";

export default function PageRoutes() {
    const {
        authState: { isAuth },
    } = useAuth();
    return (
        <div className="child-wrapper">
            <ResetScrollbar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<SingleProduct />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/checkout" element={<Checkout />} />

                        <Route path="/profile" element={<Profile />}>
                            <Route path="" element={<UserDetails />} />
                            <Route path="address" element={<AddressList />} />
                            <Route path="orders" element={<Orders />} />
                        </Route>
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
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </ResetScrollbar>
        </div>
    );
}
