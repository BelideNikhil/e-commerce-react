import "./Footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="footer-main">
            <div className="footer-content-wrapper">
                <h2>
                    PROJECT <span className="primary-accent">97</span>
                    <span className="secondary-accent">X</span>
                </h2>
                <h3>The one stop shop.</h3>
                <p>© 2022 Project 97X, All rights reserved</p>
                <p>
                    Made with <i className="fas fa-code secondary-accent"></i> by Nikhil Belide.
                </p>
                <div className="footer-social-icons">
                    <a
                        href="https://twitter.com/nikhil_belide"
                        target="_black"
                        className="btn-icon btn-icon-primary btn-icon-sm"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a
                        href="https://github.com/BelideNikhil"
                        target="_black"
                        className="btn-icon btn-icon-primary btn-icon-sm"
                    >
                        <i className="fab fa-github"></i>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/nikhilbelide/"
                        target="_black"
                        className="btn-icon btn-icon-primary btn-icon-sm"
                    >
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
            <div className="footer-actions footer-content-wrapper">
                <h2>Account</h2>
                <div>
                    <Link to="/profile">
                        <button className="mb-12 primary-accent">My Account</button>
                    </Link>
                    <Link to="/wishlist">
                        <button className="mb-12 primary-accent">Wishlist</button>
                    </Link>
                    <button className="mb-12 primary-accent">Manage Address</button>
                    <button className="mb-12 primary-accent">Privacy Policy</button>
                </div>
            </div>
            <div className="footer-content-wrapper contact-us">
                <h3>Contact Us</h3>
                <div>
                    <i className="fas fa-map-marker-alt secondary-accent"></i> 221B Baker Street, St.London NW1 6XE, UK.
                </div>
                <div>
                    <i className="fas fa-headset secondary-accent"></i> +91 88888-88888
                </div>
                <div>
                    <i className="fas fa-at secondary-accent"></i> project-97X@yahoo.com
                </div>
            </div>
        </footer>
    );
}
