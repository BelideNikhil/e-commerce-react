import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import NavAside from "../../Components/NavAside/NavAside";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Categories from "../../Components/Categories/Categories";
import BestSellers from "../../Components/BestSellers/BestSellers";
import Footer from "../../Components/Footer/Footer";
export default function Home() {
    const [navToggle, setNavToggle] = useState(false);

    function asideToggleFunction() {
        setNavToggle((prev) => !prev);
    }

    return (
        <div>
            <NavAside navToggle={navToggle} asideToggleFunction={asideToggleFunction} setNavToggle={setNavToggle} />
            <Navbar asideToggleFunction={asideToggleFunction} />
            <HeroSection />
            <div className="title mx-12">Best Sellers</div>
            <BestSellers />
            <div className="title mx-12">Shop by Categories</div>
            <Categories />
            <div className="spacer-two"></div>
            <Footer />
        </div>
    );
}
