import "./HeroSection.css";
import { Link } from "react-router-dom";
export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-content flex-clmn-center-center">
                <div className="hero-title ma-8">Pitstop for all your off-roading needs.</div>
                <Link to="/products">
                    <button href="./pages/product-page/product-page.html" className="btn btn-solid-primary ma-8">
                        Shop Now.
                    </button>
                </Link>
            </div>
        </section>
    );
}
