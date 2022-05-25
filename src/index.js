import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, ProductProvider, CartProvider, WishlistProvider, AddressProvider } from "./Context/";
// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <WishlistProvider>
                    <CartProvider>
                        <AddressProvider>
                            <ProductProvider>
                                <App />
                            </ProductProvider>
                        </AddressProvider>
                    </CartProvider>
                </WishlistProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
