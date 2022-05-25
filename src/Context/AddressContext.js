import { useContext, createContext, useReducer, useEffect } from "react";
import { addressActionTypes } from "./actionTypes";
import { addressReducer } from "../Reducers/addressReducer";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const { SET_ADDRESS_LIST, SET_LOADING, SET_ERROR } = addressActionTypes;

const AddressContext = createContext();

const initialState = { addressList: [], error: "", isLoading: false };

function AddressProvider({ children }) {
    const [addressState, addressDispatch] = useReducer(addressReducer, initialState);
    const {
        authState: { token },
    } = useAuth();

    async function getAddressList(token) {
        try {
            addressDispatch({ type: SET_LOADING });
            const { status, data } = await axios.get("/api/user/addresses", { headers: { authorization: token } });
            if (status === 200) {
                addressDispatch({ type: SET_ADDRESS_LIST, payload: { addressList: data.address } });
            }
        } catch (error) {
            addressDispatch({ type: SET_ERROR, payload: { error: error.response.data.errors[0] } });
        }
    }

    async function addNewAddress({ address, token }) {
        try {
            addressDispatch({ type: SET_LOADING });
            const { status, data } = await axios.post(
                "/api/user/address",
                { address },
                { headers: { authorization: token } }
            );
            if (status === 201) {
                toast.success("New Address Created...");
                addressDispatch({ type: SET_ADDRESS_LIST, payload: { addressList: data.address } });
            }
        } catch (error) {
            addressDispatch({ type: SET_ERROR, payload: { error: error.response.data.errors[0] } });
        }
    }

    async function editUserAddress({ token, address }) {
        try {
            addressDispatch({ type: SET_LOADING });
            const { status, data } = await axios.post(
                `/api/user/address/edit/${address._id}`,
                { address },
                { headers: { authorization: token } }
            );
            if (status === 200) {
                toast.success("Address updated.");
                addressDispatch({ type: SET_ADDRESS_LIST, payload: { addressList: data.address } });
            }
        } catch (error) {
            addressDispatch({ type: SET_ERROR, payload: { error: error.response.data.errors[0] } });
        }
    }
    async function deleteUserAddress({ token, addressId }) {
        try {
            addressDispatch({ type: SET_LOADING });
            const { status, data } = await axios.delete(`/api/user/address/${addressId}`, {
                headers: { authorization: token },
            });
            if (status === 200) {
                toast.success("Address deleted.");
                addressDispatch({ type: SET_ADDRESS_LIST, payload: { addressList: data.address } });
            }
        } catch (error) {
            addressDispatch({ type: SET_ERROR, payload: { error: error.response.data.errors[0] } });
        }
    }
    useEffect(() => {
        if (token) {
            getAddressList(token);
        }
    }, [token]);

    return (
        <AddressContext.Provider
            value={{ addressState, addressDispatch, getAddressList, addNewAddress, deleteUserAddress, editUserAddress }}
        >
            {children}
        </AddressContext.Provider>
    );
}

function useAddress() {
    return useContext(AddressContext);
}

export { AddressProvider, useAddress };
