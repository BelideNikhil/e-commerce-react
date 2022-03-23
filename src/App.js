import "./utils.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Products, Login, Signup } from "./Pages";
import { Navbar, NavAside, Footer } from "./Components/index";
import { useNav } from "./CustomHooks/useNav";
import PrivateRoute from "./PrivateRoute";
import Mockman from "mockman-js";
import Cart from "./Pages/Cart/Cart";
import Wishlist from "./Pages/Wishlist/Wishlist";
import { useAuth } from "./Context/AuthContext";

export default function App() {
    const { navToggle, setNavToggle, asideToggleFunction } = useNav();
    const {
        authState: { isAuth },
    } = useAuth();
    return (
        <div className="App">
            <NavAside navToggle={navToggle} asideToggleFunction={asideToggleFunction} setNavToggle={setNavToggle} />
            <Navbar asideToggleFunction={asideToggleFunction} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/cart" element={<Cart />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/wishlist" element={<Wishlist />} />
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
            <Footer />
        </div>
    );
}
