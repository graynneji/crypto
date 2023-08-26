import axios from "axios";
import React, { useState } from "react";
import Input from "../input/form-input.component";
import "./login.style.css";
import Button from "../button/button.component";

const Login = () => {
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:9000/api/v1/auth/login", {
        email,
        password,
      });

      console.log(res.data);
    } catch (err) {
      setError("Invalid credentials, please try again");
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="login-container">
      <h1>Login</h1>
      <Input
        label="Email"
        type="email"
        required
        onChange={handleEmailChange}
        name="email"
        value={email}
      />

      <Input
        label="Password"
        type="password"
        required
        onChange={handlePasswordChange}
        name="password"
        value={email}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button type="submit" buttonType="loginRegister" onClick={handleLogin}>
        Login
      </Button>
      {/* <button onClick={handleLogin}>Login</button> */}
    </div>
  );
};
export default Login;
