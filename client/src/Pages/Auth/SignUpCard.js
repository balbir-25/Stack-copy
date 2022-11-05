/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { UserContext } from "./Context";
import { initializeApp } from "@firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { signup } from "../../Actions/Auth";
import "./Auth.css";

function SignUpCard({ toggleCardFunc }) {
  var firebaseConfig = {
    apiKey: "AIzaSyAMMrbi1n8UHZNrZ_WOaXcUxwconZ3JzmY",
    authDomain: "stack-copy-07.firebaseapp.com",
    projectId: "stack-copy-07",
    storageBucket: "stack-copy-07.appspot.com",
    messagingSenderId: "1091965011834",
    appId: "1:1091965011834:web:1abd22b5fe91c073a5f8c3",
    measurementId: "G-93S7C7FCPB",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  // eslint-disable-next-line no-unused-vars
  const [isLogin, setIsLogin] = useContext(UserContext);
  const [checked, setchecked] = useState(false);
  const [OTP, setOTP] = useState("");
  const [displayOtp, setDisplayOTP] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCred = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const configureRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          handleLogin();
          console.log("Captcha Verified ");
        },
        defaultCountry: "IN",
      },
      auth
    );
  };

  const handleLogin = () => {
    const phoneNumber = "+91" + user?.phoneNo;
    console.log(phoneNumber);
    configureRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        setDisplayOTP(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const validateOTP = () => {
    if (OTP.length !== 6) return;
    window.confirmationResult.confirm(OTP).then((result) => {
      // User signed in successfully.
      const userResult = result.user;
      // console.log(JSON.stringify(userResult))
      alert("User is verified");
      dispatch(signup(user));
      setIsLogin(true);
      navigate("/");
    });
  };
  return (
    <div className="auth">
      {!displayOtp ? (
        <div className="authWrap">
          <div>
            <p>Display Name</p>
            <input type="text" onChange={handleCred} name="name" />
          </div>
          <div>
            <p>Email</p>
            <input type="email" onChange={handleCred} name="email" />
          </div>
          <div>
            <p>Phone No</p>
            <input type="text" onChange={handleCred} name="phoneNo" />
          </div>
          <div>
            <p>Password</p>
            <input type="password" onChange={handleCred} name="password" />
          </div>
          <div className="tc">
            <input
              type="checkbox"
              name="tc"
              onChange={() => setchecked(!checked)}
              checked={checked}
            />
            <p>
              Opt-in to receive occasional product updates, user research
              invitations, company announcements, and digest.
            </p>
          </div>
          <div id="sign-in-button"></div>
          <div className="login-button">
            {user.name !== "" &&
            user.email !== "" &&
            user.password !== "" &&
            checked ? (
              <Button
                onClick={handleLogin}
                style={{
                  marginTop: "1.5rem",
                  height: "2.3rem",
                  background: "#0a95ff",
                  boxShadow: "inset 0 1px 0 0 hsl(0deg 0% 100% / 40%)",
                  color: "white",
                  fontSize: "0.813rem",
                  textTransform: "capitalize",
                }}
              >
                Sign Up
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
                Sign Up
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>Enter OTP send to {user?.phoneNo}</p>
          <input
            type="password"
            onChange={(e) => setOTP(e.target.value)}
            name="name"
          />
          <div className="login-button">
            <Button
              onClick={validateOTP}
              style={{
                marginTop: "1.5rem",
                height: "2.3rem",
                background: "#0a95ff",
                boxShadow: "inset 0 1px 0 0 hsl(0deg 0% 100% / 40%)",
                color: "white",
                fontSize: "0.813rem",
                textTransform: "capitalize",
              }}
            >
              Submit OTP
            </Button>
          </div>
        </div>
      )}
      <div className="login-signup">
        <p>
          Already have an account?{" "}
          <span style={{ cursor: "pointer" }} onClick={toggleCardFunc}>
            Log in
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

export default SignUpCard;
