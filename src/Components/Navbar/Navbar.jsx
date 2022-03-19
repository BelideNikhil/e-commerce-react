import "./Navbar.css";
import "../../utils.css";
import { Link } from "react-router-dom";
import NavSearch from "./NavSearch";
export default function Navbar({ asideToggleFunction }) {
    return (
        <div className="header-wrapper pa-8 ">
            <header className="header pa-8 flex-row-spc-btw">
                <div>
                    <button className="btn-icon nav-toggle-btn mr-16" onClick={asideToggleFunction}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <Link to='/'>
                        <button className="header-logo">
                            PROJECT <span className="primary-accent">97</span>
                            <span className="secondary-accent">X</span>
                        </button>
                    </Link>
                </div>
                <div className="nav-search-web">
                    <NavSearch />
                </div>
                <nav className="header-nav-links">
                    <ul className="flex-row-spc-evenly">
                        <li>
                            <button className="btn-icon">
                                <i className="fas fa-user"></i>
                            </button>
                        </li>
                        <li>
                            <div className="badge-container nav-wishlist-btn">
                                <button className="btn-icon">
                                    <i className="fas fa-heart"></i>
                                    <span></span>
                                </button>
                                <span className="badge-icon badge-icon-primary">4</span>
                            </div>
                        </li>
                        <li>
                            <div className="badge-container">
                                <button className="btn-icon">
                                    <i className="fas fa-shopping-cart"></i>
                                </button>
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
