import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { addToWishlistService, deleteWishlistService, getWishlistService } from "../Services";
import { wishlistReducerFunction } from "../Reducers/index";
import toast from "react-hot-toast";

const WishlistContext = createContext();

function WishlistProvider({ children }) {
    const [wishlistState, wishlistDispatchFunction] = useReducer(wishlistReducerFunction, { wishList: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const {
        authState: { isAuth, token },
    } = useAuth();
    function addToWishList(currentCard) {
        const found = wishlistState.wishList.find((each) => each._id === currentCard._id);
        if (isAuth === true && found === undefined) {
            const toastId = toast.loading("Adding...");
            setIsLoading(true);
            (async function () {
                const { status, data } = await addToWishlistService(currentCard, token);
                if (status === 201) {
                    toast.success("Added to Wishlist", { id: toastId });
                    wishlistDispatchFunction({
                        type: "UPDATE_WISHLIST",
                        payload: { wishList: data.wishlist },
                    });
                    setIsLoading(false);
                } else {
                    toast.error("Error Occured, Try Again.", { id: toastId });
                    setError(data.message);
                    setIsLoading(false);
                }
            })();
        }
    }
    function removeFromWishlist(card) {
        if (isAuth === true) {
            setIsLoading(true);
            const toastId = toast.loading("Deleting...");
            (async function () {
                const { status, data } = await deleteWishlistService(card._id, token);
                if (status === 200) {
                    wishlistDispatchFunction({
                        type: "UPDATE_WISHLIST",
                        payload: { wishList: data.wishlist },
                    });
                    toast.success("Deleted From Wishlist", { id: toastId });
                    setIsLoading(false);
                } else {
                    toast.error("Error Occured, Try Again.", { id: toastId });
                    setError(data.message);
                    setIsLoading(false);
                }
            })();
        }
    }
    useEffect(() => {
        if (isAuth === true) {
            setIsLoading(true);
            (async function () {
                const { status, data } = await getWishlistService(token);
                if (status === 200) {
                    wishlistDispatchFunction({ type: "WISHLIST_RENDER", payload: { wishList: data.wishlist } });
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    setError(data.message);
                }
            })();
        }
    }, [isAuth]);

    return (
        <WishlistContext.Provider
            value={{ wishlistState, wishlistDispatchFunction, addToWishList, removeFromWishlist, isLoading, error }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

function useWishlist() {
    return useContext(WishlistContext);
}
export { useWishlist, WishlistProvider };
