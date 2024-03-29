import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../CustomHooks/useDocumentTitle";

export default function NotFound() {
    useDocumentTitle("Page Not Found");

    return (
        <div className="not-found-wrapper flex-clmn-center-center">
            <h2 className="mb-12">Oops!</h2>
            <h1 className="mb-12">Looks like you lost your way.</h1>
            <Link to="/">
                <button className="btn btn-solid-primary">Go Back Home</button>
            </Link>
        </div>
    );
}
