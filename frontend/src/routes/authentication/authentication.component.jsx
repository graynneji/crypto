import Login from "../../components/login/login.component";
// import React, {useState} from 'react'
import {useSelector} from 'react-redux';
import Register from '../../components/register/register.component'
import LockIcon from '@mui/icons-material/Lock';
import './authentication.style.css'

const Auth = () => {
  const isToggleLogReg = useSelector((state)=> state.auth.isToggleLogReg);
  // const [toggleLogReg, setToggleLogReg] = useState(null)
 
  // const handleToggle =()=>{
  //   setToggleLogReg(!toggleLogReg)
  // }

  return (
    <div className='auth-container'>
      <div className="verify-address"><LockIcon className="m-color" fontSize="medium" /><p>URL Verification: <span>https://</span>account.gxtrade.com</p></div>
     
      { 
      isToggleLogReg ? <Login /> : <Register/>

      }
          
          </div>
  
  );
};


export default Auth;
