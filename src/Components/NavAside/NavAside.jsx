import "./NavAside.css";

export default function NavAside({ navToggle, asideToggleFunction, setNavToggle }) {
    return (
        <div>
            <div
                className={`nav-aside-wrapper flex-clmn-start-center ${navToggle ? "nav-aside-active" : ""}`}
                onClick={() => setNavToggle(false)}
            ></div>
            {navToggle ? (
                <div className={`nav-aside-content flex-clmn-center-center ${navToggle ? "nav-aside-active" : ""}`}>
                    <div className="nav-aside-header flex-row-spc-btw">
                        <button className="btn btn-outline-primary">
                            <i className="fas fa-user"></i>Profile
                        </button>
                        <button className="btn-icon nav-toggle-btn" onClick={asideToggleFunction}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="flex-clmn-center-center nav-aside-actions">
                        <button className="btn btn-txt-underline-primary">Home</button>
                        <button className="btn btn-txt-underline-primary">Products</button>
                        <button className="btn btn-txt-underline-primary">Login</button>
                        <button className="btn btn-txt-underline-primary">Sign Up</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
