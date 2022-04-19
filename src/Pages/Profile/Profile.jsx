import "./Profile.css";
import { NavLink, Outlet } from "react-router-dom";

export default function Profile() {
    return (
        <>
            <div className="title">Account Details</div>

            <div className="profile-wrapper w-90">
                <div className="flex-row-center-center tab-container">
                    <NavLink
                        end
                        to="/profile"
                        className={`tab-btn txt-center pa-8 ${({ isActive }) => (isActive ? "active" : "")} `}
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to="/profile/orders"
                        className={`tab-btn txt-center pa-8 ${({ isActive }) => (isActive ? "active" : "")}`}
                    >
                        Orders
                    </NavLink>
                    <NavLink
                        to="/profile/address"
                        className={`tab-btn txt-center pa-8 ${({ isActive }) => (isActive ? "active" : "")} `}
                    >
                        Addresses
                    </NavLink>
                </div>

                <Outlet />
            </div>
        </>
    );
}
