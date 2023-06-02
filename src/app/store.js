import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";

const store = configureStore({
    reducer: {
        user: authReducer,
    },
});

export default store;
