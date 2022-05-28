export function cartReducerFunction(cartState, { type, payload }) {
    switch (type) {
        case "CART_RENDER":
            return { ...cartState, cartList: payload.cartList };
        case "UPDATE_CART":
            return { ...cartState, cartList: payload.cartList };
        case "SET_PRICE":
            return {
                ...cartState,
                ...payload,
            };
        default:
            return cartState;
    }
}
