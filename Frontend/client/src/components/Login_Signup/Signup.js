import "./signup.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import HelpIcon from "@mui/icons-material/Help";
import { Checkbox } from "@mui/material";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { autheError, authLoading, notify } from "../../Redux/login/action";
// import tos

import { Header } from "../Header/Header";
import { auth } from "../../Redux/login/action";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { ColorButton } from "../ProdCard/popperprodcard";
import { useDispatch, useSelector } from "react-redux";
import { authFunction } from "../../Redux/login/action";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
axios.defaults.withCredentials = true;

const Signup = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/home";
  const token = localStorage.getItem('token') || null;
  if (token !== null) {
    dispatch(notify("You have already logged in"));
    navigate(from, { replace: true });
  }
  const [userdata, setUser] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "",server:"" });

  const { user, loading, error, success } = useSelector((store) => store.auth);

  useEffect(() => {
    if (userdata?.success === true) {
      toast.success("Registration successful! Redirecting to login...");
      setUser({ ...userdata, success: undefined });
      setTimeout(() => {
        navigate("/join/login-popup");
      }, 5000);
    } else if (userdata?.success === false) {
      toast.error("Registration failed! Please try again...");
      dispatch(autheError(false));

      setUser({ ...userdata, success: undefined });
    }
  }, [userdata, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userdata, [name]: value });
    setErrors({ ...errors, [name]: "",server: "" }); // Clear error when user starts typing
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "", server:errors.server};

    if (!userdata.name) {
      newErrors.name = "Full Name is required";
      valid = false;
    }
    if (!userdata.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userdata.email)) {
      newErrors.email = "Email address is invalid";
      valid = false;
    }
    if (!userdata.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (userdata.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const URL = "http://localhost:5000/api/v1/join/signup";
    dispatch(authLoading(true));
    setTimeout(() => {}, 3000);

    axios
      .post(URL, userdata)
      .then((data) => {
        if (data.data.success === true) {
          dispatch(auth(data));
          dispatch(authLoading(false));
          dispatch(autheError(false));
          setUser({ ...userdata, success: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setErrors({...errors,server: err.response.data.message})
        dispatch(autheError(true));
        dispatch(authLoading(false));
        setUser({ ...userdata, success: false });
      });
  };

  if (token !== null) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div className="signup-container">
      <div className="loginDiv">
        <h4>Sign up Start Learning!</h4>
        <hr className="hr_line_login" />

        <div className="login_inputDiv">
          <input
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Full Name"
            className="login_pw"
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            className="login_pw"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            className="login_pw"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
          {errors.server && <p className="error-text">{errors.server}</p>}


          <div className="checkboxDiv">
            <input type="checkbox" className="signup_checkbox" />
            <label htmlFor="signup_checkbox">
              I'm in for emails with exciting discounts and personalized
              recommendations
            </label>
          </div>

          <ColorButton onClick={handleSubmit} id="signup_input">
            {loading ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Sign up"
            )}
          </ColorButton>
          <ToastContainer />

          <h6>
            By signing up you agree to our <a href="#">Terms of use</a> and{" "}
            <a href="#">privacy policy</a>
          </h6>
          <hr className="hr_line_login" />

          <div className="hv_account">
            Already have an Account? <a href="#">Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
