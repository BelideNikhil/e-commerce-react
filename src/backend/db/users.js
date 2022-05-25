import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
    {
        _id: uuid(),
        firstName: "Adarsh",
        lastName: "Balika",
        email: "adarshbalika@gmail.com",
        password: "adarshbalika",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        address: [
            {
                locality: "106, Green City Colony, Banjara Hills",
                state: "Telangana",
                country: "India",
                pincode: "500011",
                city: "Hyderabad",
                phoneNumber: "9876543210",
                name: "Adarsh",
                _id: uuid(),
            },
            {
                locality: "25, Vinayak Colony, Jubilee Hills",
                state: "Maharashtra",
                country: "India",
                pincode: "500009",
                city: "Pune",
                phoneNumber: "9876543210",
                name: "Balika",
                _id: uuid(),
            },
        ],
    },
    {
        _id: uuid(),
        firstName: "Nikhil",
        lastName: "belide",
        email: "test@gmail.com",
        password: "password123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        address: [],
    },
];
