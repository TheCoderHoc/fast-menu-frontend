import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setUser } from "../redux/authSlice";

// GET AUTHENTICATED USER
const user = JSON.parse(localStorage.getItem("user"));
const authToken = localStorage.getItem("jwt");

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

store.dispatch(setUser({ user, token: authToken }));

export default store;
