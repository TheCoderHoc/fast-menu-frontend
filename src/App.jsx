import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import PrivateRoute from "./components/PrivateRoute";
import Auth from "./pages/Auth";
import UserDashboard from "./pages/UserDashboard";
import UserDashboardHome from "./partials/Dashboard/UserDashboardHome";

const App = () => {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Navigate to="user/auth" />} />
                <Route path="user/auth" element={<Auth />} />
                <Route
                    path="user/dashboard"
                    element={
                        <PrivateRoute>
                            <UserDashboard />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path="home"
                        element={
                            <PrivateRoute>
                                <UserDashboardHome />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="menu"
                        element={
                            <PrivateRoute>
                                <h2>Menu</h2>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="favourites"
                        element={
                            <PrivateRoute>
                                <h2>Favourites</h2>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="order-history"
                        element={
                            <PrivateRoute>
                                <h2>Order History</h2>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="messages"
                        element={
                            <PrivateRoute>
                                <h2>Messages</h2>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="community"
                        element={
                            <PrivateRoute>
                                <h2>Community</h2>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="notifications"
                        element={
                            <PrivateRoute>
                                <h2>Notifications</h2>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="account"
                        element={
                            <PrivateRoute>
                                <h2>Account</h2>
                            </PrivateRoute>
                        }
                    />
                </Route>
            </Routes>
        </Provider>
    );
};

export default App;
