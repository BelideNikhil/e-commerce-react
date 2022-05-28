import { orderActionTypes } from "../Context/actionTypes";

const { SET_LOADING, SET_ERROR, SET_ORDERS_LIST } = orderActionTypes;

export function orderReducer(state, { type, payload }) {
    switch (type) {
        case SET_ORDERS_LIST:
            return { ...state, ordersList: payload.ordersList, isLoading: false };
        case SET_LOADING:
            return { ...state, isLoading: true };
        case SET_ERROR:
            return { ...state, error: payload.error, isLoading: false };
        default:
            return state;
    }
}
