import "./Wishlist.css";
import WishlistCard from "../../Components/WishlistCard/WishlistCard";
import { useWishlist } from "../../Context/WishlistContext";
export default function Wishlist() {
    const {
        wishlistState: { wishList },
    } = useWishlist();
    return (
        <div>
            <div className="spacer-one"></div>
            <div className="title">Wishlist({wishList ? wishList.length : null})</div>
            <div className="spacer-one"></div>
            <div className="wishlist-wrapper">
                {wishList?.map((each) => {
                    return <WishlistCard card={each} key={each._id} />;
                })}
            </div>
            <div className="spacer-one"></div>
        </div>
    );
}
