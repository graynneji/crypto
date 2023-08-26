import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import QrCode2Icon from "@mui/icons-material/QrCode2";

import "./header.style.css";

export default function Header({ color }) {
  return (
    <header className="header">
      <AccountCircleIcon fontSize="large" color="#444" />
      <div className="right-header">
        <ManageSearchIcon fontSize="large" />
        <QrCode2Icon fontSize="large" />
      </div>
    </header>
  );
}
