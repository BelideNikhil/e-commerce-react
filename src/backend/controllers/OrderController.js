import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";
const orderid = require("order-id")("key");

/*this is to get all orders */
export const getOrdersHandler = function (schema, request) {
    const userId = requiresAuth.call(this, request);
    if (!userId) {
        new Response(
            404,
            {},
            {
                errors: ["The email you entered is not Registered. Not Found error"],
            }
        );
    }

    const userOrders = schema.users.findBy({ _id: userId }).orders;
    return new Response(200, {}, { orders: userOrders });
};

/*this creates a new order */
export const placeOrderHandler = function (schema, request) {
    const userId = requiresAuth.call(this, request);
    if (!userId) {
        new Response(
            404,
            {},
            {
                errors: ["The email you entered is not Registered. Not Found error"],
            }
        );
    }

    const userOrders = schema.users.findBy({ _id: userId }).orders;
    const userCart = schema.users.findBy({ _id: userId }).cart;
    const { orderData } = JSON.parse(request.requestBody);

    userOrders.push({
        ...orderData,
        orderId: orderid.generate(),
        orderItems: userCart,
        orderPlacedDate: formatDate(),
    });

    this.db.users.update({ _id: userId }, { orders: userOrders });
    this.db.users.update({ _id: userId }, { cart: [] });
    return new Response(201, {}, { orders: userOrders, cart: [] });
};
