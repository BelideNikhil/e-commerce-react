import {Categories, HeroSection, BestSellers } from "../../Components";
export default function Home() {
    return (
        <>
            <HeroSection />
            <div className="title mx-12">Best Sellers</div>
            <BestSellers />
            <div className="title mx-12">Shop by Categories</div>
            <Categories />
            <div className="spacer-two"></div>
        </>
    );
}
