import React from "react";

import { useDispatch } from "react-redux";
import { auth } from "../../Redux/login/action";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    localStorage.removeItem("token");
    dispatch(auth(null));
    return <Navigate to={"/"} />;    };
