import "./UserDetails.css";
import { useAuth } from "../../Context/AuthContext";

export default function UserDetails() {
    const {
        authState: { userDetails },
        logoutHandler,
    } = useAuth();

    return (
        <div className="user-details-wrapper pa-24 w-100">
            <div className="avatar avatar-text avatar-round">
                {userDetails?.firstName[0]}
                {userDetails?.lastName[0]}
            </div>
            <div className="flex-row-spc-btw mb-8 user-details">
                <div>Full Name: </div>
                <div>
                    {userDetails?.firstName} {userDetails?.lastName}
                </div>
            </div>
            <div className="flex-row-spc-btw mb-8 user-details">
                <div>Email ID:</div>
                <div>{userDetails?.email}</div>
            </div>
            <div className="flex-row-spc-btw mb-8">
                <button className="primary-accent btn-outline-primary px-16 py-6 pointer" onClick={logoutHandler}>
                    Logout
                </button>
            </div>
        </div>
    );
}
