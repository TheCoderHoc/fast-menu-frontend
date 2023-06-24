import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import PrivateRoute from "./components/PrivateRoute";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import FoodMenu from "./pages/FoodMenu";
import Favourites from "./pages/Favourites";
import OrderHistory from "./pages/OrderHistory";
import Messages from "./pages/Messages";
import Community from "./pages/Community";
import Notifications from "./pages/Notifications";
import UserAccount from "./pages/UserAccount";
import Checkout from "./pages/Checkout";

const App = () => {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Navigate to="user/auth" />} />

                <Route path="/auth" element={<Auth />} />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path="home"
                        element={
                            <PrivateRoute>
                                <DashboardHome />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="menu"
                        element={
                            <PrivateRoute>
                                <FoodMenu />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="favourites"
                        element={
                            <PrivateRoute>
                                <Favourites />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="order-history"
                        element={
                            <PrivateRoute>
                                <OrderHistory />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="messages"
                        element={
                            <PrivateRoute>
                                <Messages />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="community"
                        element={
                            <PrivateRoute>
                                <Community />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="notifications"
                        element={
                            <PrivateRoute>
                                <Notifications />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="account"
                        element={
                            <PrivateRoute>
                                <UserAccount />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route
                    path="/checkout"
                    element={
                        <PrivateRoute>
                            <Checkout />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Provider>
    );
};

export default App;
