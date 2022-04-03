export function wishlistReducerFunction(wishlistState, { type, payload }) {
    switch (type) {
        case "WISHLIST_RENDER":
            return { ...wishlistState, wishList: payload.wishList };
        case "UPDATE_WISHLIST":
            return { ...wishlistState, wishList: payload.wishList };
        default:
            return wishlistState;
    }
}
