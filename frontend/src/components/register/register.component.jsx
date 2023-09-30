import Input from "../input/form-input.component";
import axios from "axios";
import React, { useState } from "react";
import Button from "../../components/button/button.component";
import "./register.style.css";
import { FcGoogle } from "react-icons/fc";
import LogRegToggle from "../logRegToggle/logRegToggle.component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../utils/authActions";

const defaultFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState("");
  const { firstName, lastName, email, password, confirmPassword } = formFields;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    try {
      const res = await axios.post(
        "http://localhost:9000/api/v1/auth/register",
        {
          // const res = await axios.post("https://crypto-gkdk.onrender.com/api/v1/auth/register", {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
        {
          headers: headers,
        }
      );
      console.log(res.data);
      const userdata = res.data;
      console.log(userdata);
      dispatch(setCredentials({ userdata }));
      sessionStorage.setItem("user", JSON.stringify(userdata));
      setFormFields(defaultFormFields);
      if (userdata) {
        navigate("/dashboard");
        console.log("Testing navigate" + userdata);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });

    setError("");
  };
  return (
    <>
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h1>Create Personal Account</h1>
          <div className="error">
            {error && (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
              >
                {error}
              </p>
            )}
          </div>
          <Input
            label="First Name"
            type="firstname"
            required
            onChange={handleChange}
            name="firstName"
            value={firstName}
          />
          <Input
            label="last Name"
            type="lastname"
            required
            onChange={handleChange}
            name="lastName"
            value={lastName}
          />
          <Input
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />
          <Input
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
          <Input
            label="Confirm Password"
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
          />

          <p className="terms-and-privacy">
            By creating an account, I agree to G-X Trade{" "}
            <span>Terms of Service</span> and <span>Privacy policy.</span>
          </p>

          <Button type="submit" buttonType="register">
            Register
          </Button>

          <div className="line-container">
            <div className="line"></div>
            <span className="or">or</span>
            <div className="line"></div>
          </div>

          <Button type="button" buttonType="google">
            <div className="google-inside">
              <FcGoogle size={24} /> <p className="goo">Sign-up with Google</p>
            </div>
          </Button>
          <LogRegToggle />
          {/* <p className="gxtrade">Already have an account? <p>Log in</p></p> */}
        </form>
      </div>
    </>
  );
};

export default Register;
