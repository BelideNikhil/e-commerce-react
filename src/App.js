import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import "./utils.css";
export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}
