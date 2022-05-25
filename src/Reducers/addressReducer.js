import { addressActionTypes } from "../Context/actionTypes";

const { SET_ADDRESS_LIST, SET_LOADING, SET_ERROR } = addressActionTypes;

export function addressReducer(state, { type, payload }) {
    switch (type) {
        case SET_ADDRESS_LIST:
            return { ...state, addressList: payload.addressList, isLoading: false, error: "" };
        case SET_LOADING:
            return { ...state, isLoading: true };
        case SET_ERROR:
            return { ...state, error: payload.error, isLoading: false };
        default:
            return state;
    }
}
