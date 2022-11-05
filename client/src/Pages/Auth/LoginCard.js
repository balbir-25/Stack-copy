/* eslint-disable no-lone-blocks */
import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../Actions/Auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Context";
import "./Auth.css";

function LoginCard({ toggleCardFunc }) {
  // eslint-disable-next-line no-unused-vars
  const [isLogin, setIsLogin] = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });
  const handleCred = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleLogin = (handleCred) => {
    handleCred.preventDefault();
    if (!user.email && !user.password) {
      alert("Enter email and password");
    }
    {
      dispatch(login(handleCred));
      setIsLogin(true);
      navigate("/");
    }
  };

  return (
    <div className="auth">
      <img
        src="https://www.vectorlogo.zone/logos/stackoverflow/stackoverflow-ar21.svg"
        alt="logo"
      />
      <div className="authWrap">
        <div>
          <p>Email</p>
          <input
            type="email"
            name="email"
            onChange={handleCred}
            value={user.email}
          />
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            name="password"
            onChange={handleCred}
            value={user.email}
          />
        </div>
        <div className="login-button">
          {user.email !== "" && user.password !== "" ? (
            <Button
              style={{
                marginTop: "1.5rem",
                height: "2.3rem",
                background: "#0a95ff",
                boxShadow: "inset 0 1px 0 0 hsl(0deg 0% 100% / 40%)",
                color: "white",
                fontSize: "0.813rem",
                textTransform: "capitalize",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          ) : (
            <Button
              disabled
              style={{
                marginTop: "1.5rem",
                height: "2.3rem",
                background: "#868686",
                boxShadow: "inset 0 1px 0 0 hsl(0deg 0% 100% / 40%)",
                color: "white",
                fontSize: "0.813rem",
                textTransform: "capitalize",
              }}
            >
              Login
            </Button>
          )}
        </div>
      </div>
      <div className="login-signup">
        <p>
          Don’t have an account?{" "}
          <span style={{ cursor: "pointer" }} onClick={toggleCardFunc}>
            Sign up
          </span>
        </p>
        <p>
          {" "}
          Are you an employer? <span> Sign up on Talent </span>
        </p>
      </div>
    </div>
  );
}

export default LoginCard;
