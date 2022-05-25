import { addressFormActionTypes } from "../Context/actionTypes";

const { SET_NAME, SET_LOCALITY, SET_CITY, SET_PINCODE, SET_PHONE_NUMBER, SET_STATE, RESET_FORM, SET_DUMMY_DATA } =
    addressFormActionTypes;

const dummyData = {
    name: "Nikhil",
    locality: "106, New City, Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500009",
    phoneNumber: "8888888888",
};

export function addressFormReducer(state, { type, payload }) {
    switch (type) {
        case SET_NAME:
            return { ...state, name: payload };
        case SET_LOCALITY:
            return { ...state, locality: payload };
        case SET_CITY:
            return { ...state, city: payload };
        case SET_STATE:
            return { ...state, state: payload };
        case SET_PINCODE:
            return { ...state, pincode: payload };
        case SET_PHONE_NUMBER:
            return { ...state, phoneNumber: payload };
        case RESET_FORM:
            return { ...state, ...payload };
        case SET_DUMMY_DATA:
            return { ...state, ...dummyData };
        default:
            return state;
    }
}
