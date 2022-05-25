import "./AddressForm.css";
import { useReducer } from "react";
import { useAddress, useAuth } from "../../Context";
import { addressFormvalidator } from "../../Helpers/addressFormValidator";
import { addressFormReducer, addressFormErrorReducer } from "../../Reducers";
import { addressFormActionTypes, addressFormErrorActionTypes } from "../../Context/actionTypes";

const { SET_NAME, SET_LOCALITY, SET_CITY, SET_PINCODE, SET_PHONE_NUMBER, SET_STATE, RESET_FORM, SET_DUMMY_DATA } =
    addressFormActionTypes;
const { RESET_ERRORS } = addressFormErrorActionTypes;

const initialState = {
    name: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
    phoneNumber: "",
};

const addressFormInitialState = {
    nameError: "",
    localityError: "",
    cityError: "",
    stateError: "",
    pincodeError: "",
    numberError: "",
};

export default function AddressForm({ address, setAddressModal }) {
    const [addressFormState, addressFormDispatch] = useReducer(
        addressFormReducer,
        address?._id ? address : initialState
    );
    const [addressFormErrorState, addressFormErrorDispatch] = useReducer(
        addressFormErrorReducer,
        addressFormInitialState
    );

    const { addNewAddress, editUserAddress } = useAddress();
    const {
        authState: { token },
    } = useAuth();

    function addressSubmitHandler(e) {
        e.preventDefault();
        addressFormErrorDispatch({ type: RESET_ERRORS, payload: addressFormInitialState });
        if (!addressFormvalidator(addressFormState, addressFormErrorDispatch)) {
            if (!address?._id) {
                addNewAddress({ token, address: addressFormState });
            } else {
                editUserAddress({ token, address: addressFormState });
            }
            addressFormDispatch({ type: RESET_FORM, payload: initialState });
            setAddressModal(false);
        }
    }

    return (
        <div className="address-form-wrapper flex-row-center-center ">
            <form className="address-form pa-24 w-90 ma-auto" onSubmit={addressSubmitHandler}>
                <h3 className="mb-12">Address Form</h3>
                <div className={`form-control ${addressFormErrorState.nameError ? "form-valid-error" : ""}`}>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Name"
                        value={addressFormState.name}
                        onChange={(e) => addressFormDispatch({ type: SET_NAME, payload: e.target.value })}
                    />
                    {addressFormErrorState.nameError ? (
                        <div className="form-valid-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {addressFormErrorState.nameError}
                        </div>
                    ) : null}
                </div>
                <div className={`form-control ${addressFormErrorState.localityError ? "form-valid-error" : ""}`}>
                    <input
                        type="text"
                        placeholder="H.No, Colony, Street, Area..."
                        className="form-input"
                        value={addressFormState.locality}
                        onChange={(e) => addressFormDispatch({ type: SET_LOCALITY, payload: e.target.value })}
                    />
                    {addressFormErrorState.localityError ? (
                        <div className="form-valid-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {addressFormErrorState.localityError}
                        </div>
                    ) : null}
                </div>
                <div className={`form-control ${addressFormErrorState.cityError ? "form-valid-error" : ""}`}>
                    <input
                        type="text"
                        placeholder="City"
                        className="form-input"
                        value={addressFormState.city}
                        onChange={(e) => addressFormDispatch({ type: SET_CITY, payload: e.target.value })}
                    />
                    {addressFormErrorState.cityError ? (
                        <div className="form-valid-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {addressFormErrorState.cityError}
                        </div>
                    ) : null}
                </div>
                <div className={`form-control ${addressFormErrorState.stateError ? "form-valid-error" : ""}`}>
                    <input
                        type="text"
                        placeholder="State"
                        className="form-input"
                        value={addressFormState.state}
                        onChange={(e) => addressFormDispatch({ type: SET_STATE, payload: e.target.value })}
                    />
                    {addressFormErrorState.stateError ? (
                        <div className="form-valid-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {addressFormErrorState.stateError}
                        </div>
                    ) : null}
                </div>
                <div className={`form-control ${addressFormErrorState.pincodeError ? "form-valid-error" : ""}`}>
                    <input
                        type="text"
                        placeholder="Pincode"
                        className="form-input"
                        value={addressFormState.pincode}
                        onChange={(e) => addressFormDispatch({ type: SET_PINCODE, payload: e.target.value })}
                    />
                    {addressFormErrorState.pincodeError ? (
                        <div className="form-valid-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {addressFormErrorState.pincodeError}
                        </div>
                    ) : null}
                </div>
                <div className={`form-control ${addressFormErrorState.numberError ? "form-valid-error" : ""}`}>
                    <input
                        type="tel"
                        maxLength="10"
                        placeholder="Phone Number"
                        className="form-input"
                        value={addressFormState.phoneNumber}
                        onChange={(e) => addressFormDispatch({ type: SET_PHONE_NUMBER, payload: e.target.value })}
                    />
                    {addressFormErrorState.numberError ? (
                        <div className="form-valid-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {addressFormErrorState.numberError}
                        </div>
                    ) : null}
                </div>
                <div className="actions-wrapper">
                    <button type="button" className="btn btn-primary" onClick={() => setAddressModal(false)}>
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => addressFormDispatch({ type: SET_DUMMY_DATA })}
                    >
                        Fill Dummy Data
                    </button>
                    <button className="btn btn-solid-primary ">Save</button>
                </div>
            </form>
        </div>
    );
}
