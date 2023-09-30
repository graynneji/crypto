import MenuIcon from "@mui/icons-material/Menu";
import Button from "../button/button.component";
import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import "./header.style.css";
// import {ReactComponent as MyLogo} from '../../assets/logo.svg'
// import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { BiSupport } from "react-icons/bi";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import Search from "../search/search.component";
import { Link } from "react-router-dom";

export default function Header({ color }) {
  const [userData, setUserData] = useState(null);
  const token = sessionStorage.getItem("userData");
  useEffect(() => {
    const data = sessionStorage.getItem("user");
    setUserData(data);
  }, [userData]);
  // const token = null;
  const [isSignIn, setIsSignIn] = useState(null);
  const [count, setCount] = useState(9);

  return (
    <>
      <header className="header">
        {userData ? (
          <div className="header-side">
            <Link to="/dashboard">
              <div className="logo">
                <AnalyticsIcon fontSize="large" /> G-X Trade
              </div>
            </Link>
            <Search />
            {/* <Button type="button" buttonType="deposit">
                <SystemUpdateAltIcon /> Deposit
              </Button> */}
            <BiSupport style={{ fontSize: "2.5rem" }} />

            <div className="notification-icon">
              <NotificationsNoneRoundedIcon
                // className="icon"
                style={{ fontSize: "2.5rem" }}
              />
              {count > 0 && <span className="badge">{count}</span>}
            </div>

            <MenuIcon style={{ fontSize: "2.7rem" }} />
          </div>
        ) : (
          <div className="logo">
            <AnalyticsIcon fontSize="large" /> G-X Trade
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
}
