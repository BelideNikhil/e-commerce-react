import "./Address.css";
import { useState } from "react";
import { useAddress, useAuth } from "../../Context";
import { AddressForm } from "../index";
import { useDocumentTitle } from "../../CustomHooks/useDocumentTitle";

export default function Address({ address }) {
    const { deleteUserAddress } = useAddress();
    const [showEditModal, setEditModal] = useState(false);
    const {
        authState: { token },
    } = useAuth();
    
    useDocumentTitle("Address");

    return (
        <>
            <div className="address">
                <div className="address-title mt-4">{address.name}</div>
                <div className="address-text">{address.locality}</div>
                <div>
                    <span className="address-text">{address.city}, </span>
                    <span className="address-text">{address.pincode}</span>
                </div>
                <div>
                    <span className="address-text">India, </span>
                    <span className="address-text">{address.state}</span>
                </div>
                <div className="address-text">Phone: {address.phoneNumber}</div>
                <div>
                    <button
                        className="btn btn-outline-primary delete-btn"
                        onClick={() => deleteUserAddress({ token, addressId: address._id })}
                    >
                        Delete
                    </button>
                    <button className="btn btn-solid-primary" onClick={() => setEditModal(true)}>
                        Edit
                    </button>
                </div>
            </div>
            {showEditModal ? <AddressForm setAddressModal={setEditModal} address={address} /> : null}
        </>
    );
}
