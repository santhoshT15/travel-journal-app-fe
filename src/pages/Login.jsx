import React, { useContext, useState } from "react";
import { AuthContext } from "../authContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://travel-journal-log-be.onrender.com/api/users/login",
        credentials,
        { credentials: "include" }
      );
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.user,
      });
      //console.log(res.data)
      navigate("/");
    } catch (err) {
      console.log(err.message);
      if (err.response && err.response.data) {
        // if error responce and data exist,
        // dispatch LOGIN_FAILURE with error message
        dispatch({
          type: "LOGIN_FAILURE",
          payload: err.response.data,
        });
      } else {
        // if error response and data does not exist,
        // dispatch LOGIN_FAILURE with default error message
        dispatch({
          type: "LOGIN_FAILURE",
          payload: "An Error occured while logging in",
        });
      }
    }
  };

  return (
    <div className="login">
      <Navbar />
      <div className="loginCard">
        <div className="center">
          <h1>Welcome Back!</h1>
          <form>
            <div className="txt_field">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="txt_field">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="login_button">
              <button className="button" onClick={handleClick}>
                Login
              </button>
            </div>
            <div className="signup_link">
              <p>
                Not registered?
                <Link to="/register">
                  <span className="reg">Register</span>
                </Link>
              </p>
            </div>
          </form>
          <div className="testing">
            <p>Testing User Login Details</p>
            <p>Email : user1@gmail.com</p>
            <p>Password : 12345678</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
