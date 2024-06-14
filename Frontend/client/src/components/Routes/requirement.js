import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import React from "react";
const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const token = localStorage.getItem("token");
    const user = useSelector((state) => state.auth);

    return (
            token ? <Outlet />
                : <Navigate to="/join/login-popup" state={{ from: location }} replace />
    );
}

export default RequireAuth;