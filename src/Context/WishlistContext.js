import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { addToWishlistService, deleteWishlistService, getWishlistService } from "../Services";

const WishlistContext = createContext();

function wishlistReducer(wishlistState, { type, payload }) {
    switch (type) {
        case "WISHLIST_RENDER":
            return { ...wishlistState, wishList: payload.wishList };
        case "UPDATE_WISHLIST":
            return { ...wishlistState, wishList: payload.wishList };
        default:
            return wishlistState;
    }
}
function WishlistProvider({ children }) {
    const [wishlistState, wishlistDispatchFunction] = useReducer(wishlistReducer, { wishList: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {
        authState: { isAuth, token },
    } = useAuth();
    function addToWishList(currentCard) {
        const found = wishlistState.wishList.find((each) => {
            return each._id === currentCard._id;
        });
        if (isAuth === true && found === undefined) {
            setIsLoading(true);
            (async function () {
                const { status, data } = await addToWishlistService(currentCard, token);
                if (status === 201) {
                    wishlistDispatchFunction({
                        type: "UPDATE_WISHLIST",
                        payload: { wishList: data.wishlist },
                    });
                    setIsLoading(false);
                } else {
                    console.log(data);
                    setError(data.message);
                    setIsLoading(false);
                }
            })();
        }
    }
    function removeFromWishlist(card) {
        if (isAuth === true) {
            setIsLoading(true);
            (async function () {
                const { status, data } = await deleteWishlistService(card._id, token);
                if (status === 200) {
                    wishlistDispatchFunction({
                        type: "UPDATE_WISHLIST",
                        payload: { wishList: data.wishlist },
                    });
                    setIsLoading(false);
                } else {
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
