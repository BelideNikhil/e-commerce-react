import "./Wishlist.css";
import { WishlistCard } from "../../Components";
import { useWishlist } from "../../Context/WishlistContext";
import { useDocumentTitle } from "../../CustomHooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
    const {
        wishlistState: { wishList },
    } = useWishlist();
    const navigate = useNavigate();

    useDocumentTitle("Wishlist");

    return (
        <div>
            <div className="spacer-one"></div>
            <div className="title">Wishlist {wishList?.length ? `(${wishList.length})` : null}</div>
            <div className="spacer-one"></div>
            {wishList?.length ? (
                <div className="wishlist-wrapper">
                    {wishList?.map((each) => {
                        return <WishlistCard card={each} key={each._id} />;
                    })}
                </div>
            ) : (
                <div className="flex-clmn-center-center mt-24">
                    <h4 className="mb-8">Your Wishlist is Empty</h4>
                    <button className="btn btn-solid-primary" onClick={() => navigate("/products")}>
                        Shop Now
                    </button>
                </div>
            )}
            <div className="spacer-one"></div>
        </div>
    );
}
