import { useContext, createContext, useReducer } from "react";
import axios from "axios";
import { orderActionTypes } from "./actionTypes";
import { orderReducer } from "../Reducers";
import { useCart } from "../Context";

const { SET_LOADING, SET_ERROR, SET_ORDERS_LIST } = orderActionTypes;

const OrderContext = createContext();

const initialState = { ordersList: [], error: "", isLoading: false };

function OrderProvider({ children }) {
    const [orderState, orderDispatch] = useReducer(orderReducer, initialState);
    const { cartDispatchFucntion } = useCart();

    async function getOrdersList(token) {
        try {
            orderDispatch({ type: SET_LOADING });

            const { data } = await axios.get("/api/user/orders", { headers: { authorization: token } });
            orderDispatch({ type: SET_ORDERS_LIST, payload: { ordersList: data.orders } });
        } catch (error) {
            orderDispatch({ type: SET_ERROR, payload: { error: error.response.data.errors[0] } });
        }
    }

    async function placeOrderHandler({ token, orderData }) {
        try {
            orderDispatch({ type: SET_LOADING });
            const { data } = await axios.post("/api/user/orders", { orderData }, { headers: { authorization: token } });
            cartDispatchFucntion({ type: "UPDATE_CART", payload: { cartList: data.cart } });
            orderDispatch({ type: SET_ORDERS_LIST, payload: { ordersList: data.orders } });
        } catch (error) {
            orderDispatch({ type: SET_ERROR, payload: { error: error.response.data.errors[0] } });
        }
    }

    return (
        <OrderContext.Provider value={{ orderState, orderDispatch, getOrdersList, placeOrderHandler }}>
            {children}
        </OrderContext.Provider>
    );
}

function useOrders() {
    return useContext(OrderContext);
}

export { OrderProvider, useOrders };
