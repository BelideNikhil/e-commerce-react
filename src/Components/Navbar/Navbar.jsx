import "./Navbar.css";
import "../../utils.css";
import { Link } from "react-router-dom";
import NavSearch from "./NavSearch";
export default function Navbar({ asideToggleFunction }) {
    return (
        <div className="header-wrapper pa-8 ">
            <header className="header pa-8 flex-row-spc-btw">
                <button className="btn-icon nav-toggle-btn mr-16" onClick={asideToggleFunction}>
                    <i className="fas fa-bars"></i>
                </button>
                <Link to="/">
                    <button className="header-logo">
                        PROJECT <span className="primary-accent">97</span>
                        <span className="secondary-accent">X</span>
                    </button>
                </Link>
                <div className="nav-search-web">
                    <NavSearch />
                </div>
                <nav className="header-nav-links">
                    <ul className="flex-row-spc-evenly">
                        <li>
                            <Link to="/products">
                                <button className="btn btn-primary nav-shop-btn">Shop Now</button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <button className="btn-icon">
                                    <i className="fas fa-user-alt"></i>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <div className="badge-container nav-wishlist-btn">
                                <Link to="wishlist">
                                    <button className="btn-icon">
                                        <i className="fas fa-heart"></i>
                                    </button>
                                </Link>
                                <span className="badge-icon badge-icon-primary">4</span>
                            </div>
                        </li>
                        <li>
                            <div className="badge-container">
                                <Link to="/cart">
                                    <button className="btn-icon">
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </Link>
                                <span className="badge-icon badge-icon-primary">1</span>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="nav-search-mobile">
                <NavSearch />
            </div>
        </div>
    );
}
