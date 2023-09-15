import Login from "../../components/login/login.component";
// import React, {useState} from 'react'
import { useSelector } from "react-redux";
import Register from "../../components/register/register.component";
import LockIcon from "@mui/icons-material/Lock";
import "./authentication.style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Auth = () => {
  const navigate = useNavigate();
  const isToggleLogReg = useSelector((state) => state.auth.isToggleLogReg);
  const data = useSelector((state) => state.auth.user);
  // const data = localStorage.getItem("accessToken");
  const userData = localStorage.getItem("userData");
  // const userId = null;

  console.log(userData);
  useEffect(() => {
    // if (data) {
    if (userData) {
      navigate("/dashboard");
    }
  }, [userData, navigate]);
  console.log(typeof navigate);
  return (
    <div className="auth-container">
      <div className="verify-address">
        <LockIcon className="m-color" fontSize="medium" />
        <p>
          URL Verification: <span>https://</span>account.gxtrade.com
        </p>
      </div>
      {isToggleLogReg ? <Login /> : <Register />}
    </div>
  );
};

export default Auth;
