import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { Outlet, Link } from "react-router-dom";
import "./menu.style.css";
const Menu = () => {
  return (
    <div className="menu-container">
      <Outlet />
      <nav className="nav-menu">
        {/* <div> */}
        <Link to="/market">
          <LeaderboardIcon fontSize="medium" />
          <p>Market</p>
        </Link>
        {/* </div> */}
        {/* <div> */}
        <Link to="feed">
          <RssFeedIcon fontSize="medium" />
          <p>Feed</p>
        </Link>
        {/* </div>
        <div> */}
        <Link to="swap">
          <SwapHorizontalCircleIcon fontSize="large" />
        </Link>
        {/* </div>
        <div> */}
        <Link to="/services">
          <MiscellaneousServicesIcon fontSize="medium" />
          <p>Services</p>
        </Link>
        {/* </div>
        <div> */}
        <Link to="portfolio">
          <AccountBalanceWalletIcon fontSize="medium" />
          <p>Portfolio</p>
        </Link>
        {/* </div> */}
      </nav>
    </div>
  );
};
export default Menu;
