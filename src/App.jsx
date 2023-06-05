import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import Auth from "./pages/Auth";
import UserDashboard from "./pages/UserDashboard";
import UserDashboardHome from "./layouts/UserDashboardHome";

const App = () => {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="user/auth" element={<Auth />} />
                <Route path="user/dashboard" element={<UserDashboard />}>
                    <Route path="home" element={<UserDashboardHome />} />
                    <Route path="menu" element={<h2>Menu</h2>} />
                    <Route path="favourites" element={<h2>Favourites</h2>} />
                    <Route
                        path="order-history"
                        element={<h2>Order History</h2>}
                    />
                    <Route path="messages" element={<h2>Messages</h2>} />
                    <Route path="community" element={<h2>Community</h2>} />
                    <Route
                        path="notifications"
                        element={<h2>Notifications</h2>}
                    />
                    <Route path="account" element={<h2>Account</h2>} />
                </Route>
            </Routes>
        </Provider>
    );
};

export default App;
