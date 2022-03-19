import { useState } from "react";
import { Navbar, NavAside, Categories, HeroSection, BestSellers, Footer } from "../../Components";
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
