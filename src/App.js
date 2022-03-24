import "./utils.css";
import { Navbar, NavAside, Footer, ScrollToTop } from "./Components/index";
import PageRoutes from "./Routes/PageRoutes";
import { useNav } from "./CustomHooks/useNav";
export default function App() {
    const { navToggle, setNavToggle, asideToggleFunction } = useNav();
    return (
        <div className="App">
            <NavAside navToggle={navToggle} asideToggleFunction={asideToggleFunction} setNavToggle={setNavToggle} />
            <Navbar asideToggleFunction={asideToggleFunction} />
            <ScrollToTop />
            <PageRoutes />
            <Footer />
        </div>
    );
}
