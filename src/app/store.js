import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setUser } from "../redux/auth.slice";
import cartReducer from "../redux/cart.slice";
import productReducer from "../redux/product.slice";
import favouriteReducer from "../redux/favourite.slice";
import UIReducer from "../redux/UI.slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        product: productReducer,
        favourite: favouriteReducer,
        UI: UIReducer,
    },
});

// GET AUTHENTICATED USER
const user = JSON.parse(localStorage.getItem("user"));
const authToken = localStorage.getItem("jwt");
store.dispatch(setUser({ user, token: authToken }));

export default store;
