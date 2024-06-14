import "./login.css";
import React, { useState } from "react";
import { ColorButton } from "../ProdCard/popperprodcard";
import { useDispatch, useSelector } from "react-redux";
import { authFunction } from "../../Redux/login/action";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { auth,authLoading,autheError,notify} from "../../Redux/login/action";
import axios from "../../axios/axios";
import { useEffect } from "react";
axios.defaults.withCredentials = true;

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/home";
  const token = localStorage.getItem('token') || null;
  if (token !== null) {
    navigate(from, { replace: true });
  }
  const [userdata, setUser] = useState({ email: "", password: "" });
  const { user, loading, error } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  useEffect(()=>{
    if (token !== null) {
      dispatch(notify("You have already logged in"))
    }
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userdata, [name]: value });
  };

  return (
    <div className="login-container">
      <div className="loginDiv">
        <h4>Log In to Your Udemy Account!</h4>
        <hr className="hr_line_login"></hr>

        {/* <div className="img_tag">
          <img
            src="	https://img-c.udemycdn.com/user/50x50/anonymous_3.png"
            alt=""
          />
          <p>Welcome back, {"Yashas"}</p>{" "}
        </div> */}

        <div className="login_inputDiv">
          {error ? (
            <Alert className="alert" severity="error">
              <p>There was a problem logging in.</p>
              <p>Check your email and password or create an account.</p>
            </Alert>
          ) : (
            <></>
          )}
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="email"
            className="login_pw"
          ></input>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Passward"
            className="login_pw"
          ></input>

          {/* <button id="login_input">Log in</button> */}
          <ColorButton
            onClick={() => {
              const URL = "http://localhost:5000/api/v1/join/login";
              dispatch(authLoading(true));
              setTimeout(() => {
                
              }, 3000);
              
              axios
              .post(URL, userdata)
              .then((data) => {
                if (data.data.success === true){
                  localStorage.setItem('token',data.data.token);
                  data.data.token = undefined;
                  dispatch(auth(data));
                  dispatch(authLoading(false));
                  dispatch(autheError(false));
                  setUser({...userdata,success:true})
                }
              })
              .catch((err) => {
                console.log(err.response.data);
                dispatch(autheError(true));
                dispatch(authLoading(false));
                setUser({...userdata,success:false})
              });
              
            }}
            id="login_input"
          >
            {loading ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Log in"
            )}
          </ColorButton>
        </div>

        <div className="forgot_pws">
          <span className="forgot_pw">or </span>
          <a href="#">Forgot Password</a>
          <div className="diff_acct">
            <a href="#">Log in</a>to a <a href="#">different account</a>
          </div>{" "}
        </div>

        <div className="login_org">
          <p>
            Don't have an account?{" "}
            <span>
              <a href="#">Sign up</a>
            </span>
          </p>
          <a href="#" className="login_org1">
            Log in with your organization
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
