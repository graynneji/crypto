import axios from "axios";
import React, { useState } from "react";
import Input from "../input/form-input.component";
import "./login.style.css";
import Button from "../button/button.component";
import {FcGoogle} from 'react-icons/fc';
import LogRegToggle from '../logRegToggle/logRegToggle.component';
import {useDispatch} from 'react-redux';
import {login} from '../../utils/authActions';

const defaultFormFields = {
  email: '',
  password: '',
}
const Login = () => {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password} = formFields
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('logged')
    try {
      const res = await axios.post("http://localhost:9000/api/v1/auth/login", {
        email,
        password,
      });
      
      dispatch(login({accessToken: res.data.accessToken, userId: res.data.user._id}))
      console.log(res.data);

      setFormFields(defaultFormFields)
    } catch (err) {
      if(err.response){
        setError(err.response.data.message)
      }
    
     
    }
  };

  const handleChange = (event)=>{
   
    const {name, value}= event.target
  setFormFields({...formFields, [name]: value})
  console.log(formFields)
  setError('')
  }

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  //   console.log(e.target.value);
  //   setError("");
  // };
  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  //   setError("");
  // };


  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
      <h1>Log-In</h1>
      <div className="error">
      {error && <p style={{ color: "red", textAlign: 'center', fontSize:'1.5rem' }}>{error}</p>}
      </div>
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
      <p className="forget"> Forgot password ?</p>
      
      <Button type="submit" buttonType='login' >
        Login
      </Button>
      
{/* horizontal line */}
<div className="line-container">
      <div className="line"></div>
      <span className="or">or</span>
      <div className="line"></div>
    </div>

      <Button type='button' buttonType='google'><div className="google-inside"><FcGoogle size={24}/> <p className="goo">Continue with Google</p></div></Button>
     
      {/* <button onClick={handleLogin}>Login</button> */}

      <LogRegToggle />
      </form>
    </div>
    
  );
};
export default Login;
