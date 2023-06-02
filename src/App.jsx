import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import Auth from "./pages/Auth";

const App = () => {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/user/auth" element={<Auth />} />
                <Route
                    path="/user/dashboard"
                    element={<h2>User Dashboard</h2>}
                />
            </Routes>
        </Provider>
    );
};

export default App;