import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setUser } from "../redux/authSlice";
import cartReducer from "../redux/cartSlice";
import productReducer from "../redux/productSlice";
import favouriteReducer from "../redux/favouriteSlice";
import UIReducer from "../redux/UISlice";

// GET AUTHENTICATED USER
const user = JSON.parse(localStorage.getItem("user"));
const authToken = localStorage.getItem("jwt");

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        product: productReducer,
        favourite: favouriteReducer,
        UI: UIReducer,
    },
});

store.dispatch(setUser({ user, token: authToken }));

export default store;
