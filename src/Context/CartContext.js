import { createContext, useReducer, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useWishlist } from "./WishlistContext";
import { getCartService, deleteCartItemService, updateCartQtyService, addToCartService } from "../Services";
const CartContext = createContext();
function cartReducerFunction(cartState, { type, payload }) {
    switch (type) {
        case "CART_RENDER":
            return { ...cartState, cartList: payload.cartList };
        case "UPDATE_CART":
            return { ...cartState, cartList: payload.cartList };
        default:
            return cartState;
    }
}
function CartProvider({ children }) {
    const [cartState, cartDispatchFucntion] = useReducer(cartReducerFunction, { cartList: [] });
    const { addToWishList } = useWishlist();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {
        authState: { isAuth, token },
    } = useAuth();
    function addToCartHandler(currentCard) {
        if (isAuth === true) {
            setIsLoading(true);
            (async function () {
                const { status, data } = await addToCartService(currentCard, token);
                if (status === 201) {
                    cartDispatchFucntion({ type: "UPDATE_CART", payload: { cartList: data.cart } });
                    setIsLoading(false);
                } else {
                    setError(data.message);
                    setIsLoading(false);
                }
            })();
        }
    }
    function updateQtyHandler(id, type) {
        if (isAuth === true) {
            setIsLoading(true);
            (async function () {
                const { status, data } = await updateCartQtyService(id, type, token);
                if (status === 200) {
                    cartDispatchFucntion({ type: "UPDATE_CART", payload: { cartList: data.cart } });
                    setIsLoading(false);
                } else {
                    setError(data.message);
                    setIsLoading(false);
                }
            })();
        }
    }
    function deleteFromCartHandler(id) {
        if (isAuth === true) {
            setIsLoading(true);
            (async function () {
                const { status, data } = await deleteCartItemService(id, token);
                if (status === 200) {
                    cartDispatchFucntion({ type: "UPDATE_CART", payload: { cartList: data.cart } });
                    setIsLoading(false);
                } else {
                    setError(data.message);
                    setIsLoading(false);
                }
            })();
        }
    }
    function moveToWishlist(card) {
        if (isAuth === true) {
            deleteFromCartHandler(card._id);
            addToWishList(card);
        }
    }
    useEffect(() => {
        if (isAuth === true) {
            setIsLoading(true);
            (async function () {
                const { status, data } = await getCartService(token);
                if (status === 200) {
                    cartDispatchFucntion({ type: "CART_RENDER", payload: { cartList: data.cart } });
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    setError(data.message);
                }
            })();
        }
    }, [isAuth]);
    return (
        <CartContext.Provider
            value={{
                cartState,
                cartDispatchFucntion,
                isLoading,
                addToCartHandler,
                updateQtyHandler,
                deleteFromCartHandler,
                moveToWishlist,
                error,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    return useContext(CartContext);
}
export { CartProvider, useCart };
