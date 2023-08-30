// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ManageSearchIcon from "@mui/icons-material/ManageSearch";
// import QrCode2Icon from "@mui/icons-material/QrCode2";
import MenuIcon from '@mui/icons-material/Menu';
import Button from '../button/button.component'
import {Outlet} from 'react-router-dom'
import React, {useState}from 'react'
import "./header.style.css";
// import {ReactComponent as MyLogo} from '../../assets/logo.svg'
// import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AnalyticsIcon from '@mui/icons-material/Analytics';
export default function Header({ color,  }) {
  const [isSignIn, setIsSignIn] = useState(null)
  return (
    <>
    <header className="header">
      <div className='logo'><AnalyticsIcon fontSize='large'/> G-X Trade</div>
      {
        isSignIn  && <div className='header-side'>
        <Button type='button' buttonType='register'>Login</Button>
       
        <MenuIcon fontSize='large'/>
      </div>
      }
      
      {/* <AccountCircleIcon fontSize="large" color="#444" />
      <div className="right-header">
        <ManageSearchIcon fontSize="large" />
        <QrCode2Icon fontSize="large" />
      </div> */}
    </header>
    <Outlet />
    </>
  );
}
