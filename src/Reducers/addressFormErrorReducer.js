import { addressFormErrorActionTypes } from "../Context/actionTypes";

export function addressFormErrorReducer(state, { type, payload }) {
    const {
        SET_NAME_ERROR,
        SET_LOCALITY_ERROR,
        SET_CITY_ERROR,
        SET_PINCODE_ERROR,
        SET_STATE_ERROR,
        SET_NUMBER_ERROR,
        RESET_ERRORS,
    } = addressFormErrorActionTypes;

    switch (type) {
        case SET_NAME_ERROR:
            return { ...state, nameError: payload.error };
        case SET_LOCALITY_ERROR:
            return { ...state, localityError: payload.error };
        case SET_CITY_ERROR:
            return { ...state, cityError: payload.error };
        case SET_STATE_ERROR:
            return { ...state, stateError: payload.error };
        case SET_PINCODE_ERROR:
            return { ...state, pincodeError: payload.error };
        case SET_NUMBER_ERROR:
            return { ...state, numberError: payload.error };
        case RESET_ERRORS:
            return { ...payload };
        default:
            return state;
    }
}
