import MenuIcon from "@mui/icons-material/Menu";
import Button from "../button/button.component";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import "./header.style.css";
// import {ReactComponent as MyLogo} from '../../assets/logo.svg'
// import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { BiSupport } from "react-icons/bi";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import Search from "../search/search.component";
export default function Header({ color }) {
  const token = localStorage.getItem("accessToken");
  // const token = null;
  const [isSignIn, setIsSignIn] = useState(null);
  const [count, setCount] = useState(9);
  return (
    <>
      <header className="header">
        {token ? (
          <div className="header-side">
            <AccountCircleIcon style={{ fontSize: "2.5rem" }} />
            <Search />
            {/* <Button type="button" buttonType="deposit">
                <SystemUpdateAltIcon /> Deposit
              </Button> */}
            <BiSupport style={{ fontSize: "2rem" }} />

            <div className="notification-icon">
              <NotificationsNoneRoundedIcon
                // className="icon"
                style={{ fontSize: "2rem" }}
              />
              {count > 0 && <span className="badge">{count}</span>}
            </div>

            <MenuIcon style={{ fontSize: "2.5rem" }} />
          </div>
        ) : (
          <div className="logo">
            <AnalyticsIcon fontSize="large" /> G-X Trade
          </div>
        )}

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
