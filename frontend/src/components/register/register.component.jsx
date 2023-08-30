import Input from '../input/form-input.component'
import axios from 'axios'
import React, {useState} from 'react'
import Button from '../../components/button/button.component'
import './register.style.css'
import {FcGoogle} from 'react-icons/fc'
import LogRegToggle from '../logRegToggle/logRegToggle.component'

const defaultFormFields  = {
  firstName: '',
  lastName:'',
  email:'',
  password:'',
  confirmPassword:'',
}
const Register =()=>{
  const [formFields, setFormFields]=useState(defaultFormFields);
  const [error, setError]= useState('');
  const {firstName, lastName, email, password, confirmPassword} = formFields;

//   const handleSubmit = async ()=>{
// const res = await axios.post('http://localhost:9000/api/v1/register', {

// })

//   }
  const handleChange =(event)=>{
    const {name, value}= event.target
  setFormFields({...formFields, [name]: value})
  console.log(formFields)
  }
    return(

        
        <>
   <div className='register-container'>
      <form >
      <h1>Create Personal Account</h1>
      <div className="error">
      {error && <p style={{ color: "red", textAlign: 'center', fontSize:'1.5rem' }}>{error}</p>}
      </div>
      <Input
        label="Firstname"
        type="firstname"
        required
        onChange={handleChange}
        name="firstName"
        value={firstName}
      />
      <Input
        label="lastname"
        type="lastname"
        required
        onChange={handleChange}
        name="lastname"
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
        name="password"
        value={confirmPassword}
      />
       
       <p className='terms-and-privacy'>By creating an account, I agree to G-X Trade <span>Terms of Service</span> and <span>Privacy policy</span></p>
      
      <Button type="submit" buttonType='register' >
        Register
      </Button> 

      <div className="line-container">
      <div className="line"></div>
      <span className="or">or</span>
      <div className="line"></div>
    </div>

      <Button type='button' buttonType='google'><div className="google-inside"><FcGoogle size={24}/> <p className="goo">Sign-up with Google</p></div></Button>
      <LogRegToggle />
      {/* <p className="gxtrade">Already have an account? <p>Log in</p></p> */}
      </form>
      </div>
        </>
    )
}

export default Register