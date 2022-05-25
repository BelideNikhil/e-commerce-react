import { useState } from "react";
import { useAddress } from "../../Context";
import { AddressForm } from "../index";
import Address from "./Address";

export default function AddressList() {
    const { addressState } = useAddress();
    const [showAddressModal, setAddressModal] = useState(false);

    return (
        <div className="pa-24">
            <div className="flex-row-spc-btw mb-12">
                <h3>My Addresses</h3>
                <button className="btn btn-primary add-btn" onClick={() => setAddressModal(true)}>
                    <i className="fas fa-plus"></i>Add Address
                </button>
            </div>
            <div>
                {addressState.addressList?.map((address) => {
                    return <Address address={address} key={address._id} />;
                })}
            </div>

            {showAddressModal ? <AddressForm setAddressModal={setAddressModal} /> : null}
        </div>
    );
}
