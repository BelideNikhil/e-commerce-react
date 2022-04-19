import "./NavAside.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
export default function NavAside({ navToggle, asideToggleFunction, setNavToggle }) {
    const {
        authState: { isAuth },
    } = useAuth();
    const navigate = useNavigate();

    function asideNavigate(navigateTo) {
        navigate(navigateTo);
        asideToggleFunction();
    }

    return (
        <div>
            <div
                className={`nav-aside-wrapper flex-clmn-start-center ${navToggle ? "nav-aside-active" : ""}`}
                onClick={() => setNavToggle(false)}
            ></div>
            {navToggle ? (
                <div className={`nav-aside-content flex-clmn-center-center ${navToggle ? "nav-aside-active" : ""}`}>
                    <div className="nav-aside-header flex-row-spc-btw">
                        <button className="btn btn-outline-primary" onClick={() => asideNavigate("/profile")}>
                            <i className="fas fa-user"></i>Profile
                        </button>
                        <button className="btn-icon nav-toggle-btn" onClick={asideToggleFunction}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="flex-clmn-center-center nav-aside-actions">
                        <button className="btn btn-txt-underline-primary" onClick={() => asideNavigate("/")}>
                            Home
                        </button>
                        <button className="btn btn-txt-underline-primary" onClick={() => asideNavigate("/products")}>
                            Products
                        </button>
                        {!isAuth ? (
                            <>
                                <button
                                    className="btn btn-txt-underline-primary"
                                    onClick={() => asideNavigate("/login")}
                                >
                                    Login
                                </button>
                                <button
                                    className="btn btn-txt-underline-primary"
                                    onClick={() => asideNavigate("/signup")}
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="btn btn-txt-underline-primary"
                                    onClick={() => asideNavigate("/wishlist")}
                                >
                                    Wishlist
                                </button>
                                <button
                                    className="btn btn-txt-underline-primary"
                                    onClick={() => asideNavigate("/cart")}
                                >
                                    Cart
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
