import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Input from "../input/form-input.component";
import "./login.style.css";
import Button from "../button/button.component";
import { FcGoogle } from "react-icons/fc";
import LogRegToggle from "../logRegToggle/logRegToggle.component";
import { useDispatch, useSelector } from "react-redux";
// import {login} from '../../utils/authActions';
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../utils/authActions";
import { useLoginMutation } from "../../utils/authApiSlice";

const defaultFormFields = {
  email: "",
  password: "",
};
const Login = () => {
  //new codes

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  //
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //the useEffect new

  useEffect(() => {
    setError("");
  }, [email, password]);

  // useEffect(()=>{
  // localStorage.setItem("userdata", userId)
  // localStorage.setItem("accessToken", token)

  // }, [userId, token])
  //

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userdata = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userdata, email }));
      setFormFields(defaultFormFields);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.status);

      if (err.status === 401) {
        setError(err.data.message); // Handle other server errors
      } else {
        setError("An error occurred. Please try again."); // Handle network errors
      }
    }
  };

  // const headers = {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json'

  // }

  // try {
  //   const res = await axios.post("http://localhost:9000/api/v1/auth/login", {
  //   // const res = await axios.post("https://crypto-gkdk.onrender.com/api/v1/auth/login",
  //   // {
  //     email,
  //     password,
  // },
  //     {
  //       headers: headers,
  //     }
  //   );

  //   dispatch(login({accessToken: res.data.accessToken, userId: res.data.others._id}))
  //   console.log(res.data);

  //   setFormFields(defaultFormFields)
  // } catch (err) {
  //   console.log(err.response.data.message)

  //   if (err.response) {

  //       setError(err.response.data.message); // Handle other server errors

  //   } else {
  //     setError("An error occurred. Please try again."); // Handle network errors
  //   }

  // }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    // setError('')
  };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  //   console.log(e.target.value);
  //   setError("");
  // };
  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  //   setError("");
  // };

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Log-In</h1>
        <div className="error">
          {error && (
            <p
              style={{ color: "red", textAlign: "center", fontSize: "1.5rem" }}
            >
              {error}
            </p>
          )}
        </div>
        <Input
          label="Email"
          type="email"
          required
          // autoComplete='óff'
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
        <p className="forget"> Forgot password ? {token}</p>

        <Button type="submit" buttonType="login">
          Login
        </Button>

        {/* horizontal line */}
        <div className="line-container">
          <div className="line"></div>
          <span className="or">or</span>
          <div className="line"></div>
        </div>

        <Button type="button" buttonType="google">
          <div className="google-inside">
            <FcGoogle size={24} /> <p className="goo">Continue with Google</p>
          </div>
        </Button>

        {/* <button onClick={handleLogin}>Login</button> */}

        <LogRegToggle />
      </form>
    </div>
  );

  return content;

  //   return (
  //     <div className="login-container">
  //       <form onSubmit={handleLogin}>
  //       <h1>Log-In</h1>
  //       <div className="error">
  //       {error && <p style={{ color: "red", textAlign: 'center', fontSize:'1.5rem' }}>{error}</p>}
  //       </div>
  //       <Input
  //         label="Email"
  //         type="email"
  //         required
  //         onChange={handleChange}
  //         name="email"
  //         value={email}
  //       />

  //       <Input
  //         label="Password"
  //         type="password"
  //         required
  //         onChange={handleChange}
  //         name="password"
  //         value={password}
  //       />
  //       <p className="forget"> Forgot password ? {accessToken}</p>

  //       <Button type="submit" buttonType='login' >
  //         Login
  //       </Button>

  // {/* horizontal line */}
  // <div className="line-container">
  //       <div className="line"></div>
  //       <span className="or">or</span>
  //       <div className="line"></div>
  //     </div>

  //       <Button type='button' buttonType='google'><div className="google-inside"><FcGoogle size={24}/> <p className="goo">Continue with Google</p></div></Button>

  //       {/* <button onClick={handleLogin}>Login</button> */}

  //       <LogRegToggle />
  //       </form>
  //     </div>

  //   );
};
export default Login;
