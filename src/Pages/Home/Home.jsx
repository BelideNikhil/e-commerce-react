import { useDocumentTitle } from "../../CustomHooks/useDocumentTitle";
import { Categories, HeroSection, Featured } from "../../Components";

export default function Home() {
    useDocumentTitle("HOME");
    return (
        <>
            <HeroSection />
            <div className="title mx-12">Featured</div>
            <Featured />
            <div className="title mx-12">Categories</div>
            <Categories />
            <div className="spacer-two"></div>
        </>
    );
}
