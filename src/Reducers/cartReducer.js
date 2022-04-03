export function cartReducerFunction(cartState, { type, payload }) {
    switch (type) {
        case "CART_RENDER":
            return { ...cartState, cartList: payload.cartList };
        case "UPDATE_CART":
            return { ...cartState, cartList: payload.cartList };
        default:
            return cartState;
    }
}
