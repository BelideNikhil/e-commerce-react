import "./utils.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import { Navbar, NavAside,Footer} from "./Components/index";
import { useNav } from "./CustomHooks/useNav";
import Mockman from 'mockman-js'

export default function App() {
  const {navToggle,setNavToggle,asideToggleFunction}=useNav()
    return (
        <div className="App">
            <NavAside navToggle={navToggle} asideToggleFunction={asideToggleFunction} setNavToggle={setNavToggle} />
            <Navbar asideToggleFunction={asideToggleFunction} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/mock" element={<Mockman/>}/>
                </Routes>
            <Footer />
        </div>
    );
}
