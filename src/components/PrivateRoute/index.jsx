import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);

    if (!auth.user) {
        return <Navigate to="/user/auth" />;
    }

    return children;
};

export default PrivateRoute;
