import { ReactComponent as QrCode } from "../../assets/qr-code.svg";
import React, { useState } from "react";
import "./deposit.style.css";
import ErrorIcon from "@mui/icons-material/Error";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { BiSolidCopy } from "react-icons/bi";
import { FcCursor } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
const Deposit = () => {
  const [btcAddress, setBtcAddress] = useState(
    "13op65W7eJiJhUMQB7PvMta4a5e4iavLfd"
  );

  const [copy, setCopy] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const handleCopyClick = () => {
    // Create a textarea element to hold the address
    const textArea = document.createElement("textarea");
    textArea.value = btcAddress;
    document.body.appendChild(textArea);

    // Select and copy the address to the clipboard
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    // Show a success message (you can use a tooltip, toast, or other UI component)
    // alert("Bitcoin address copied to clipboard: " + btcAddress);
    setCopy(!copy);
  };
  return (
    <>
      <div className="content-container">
        <div className="back-help">
          <KeyboardBackspaceIcon
            style={{ fontSize: "2.5rem", color: "#444" }}
            onClick={handleBack}
          />
          <LiveHelpIcon style={{ fontSize: "2.5rem", color: "#444" }} />
        </div>
        <p className="deposit-btc">Deposit BTC</p>
        <div className="qr-code">
          <QrCode />
        </div>
        <p className="instruction">Send only BTC to this deposit address</p>
        <div className="hr"></div>
        <p className="network">Network</p>
        <div className="btc-deposit">
          <p>Bitcoin</p>
        </div>

        <div className="btc-address">
          <p className="deposit-bitcoin">Bitcoin Deposit Address</p>
          <div className="address-bar">
            <p className="btc">{btcAddress}</p>
            <div className="copy" onClick={handleCopyClick}>
              <BiSolidCopy
                style={{
                  fontSize: "1.5rem",
                  alignSelf: "end",
                  marginBottom: ".5rem",
                }}
              />
              {copy && <p>copied</p>}
            </div>
          </div>
        </div>
        <div className="minimum">
          <div className="confirmation">
            <span className="start">Minimum deposit</span>
            <span className="end">0.00000001 BTC</span>
          </div>
          <div className="confirmation">
            <span className="start">Credited (Trading enabled)</span>
            <span className="end">1 Confirmation</span>
          </div>
          <div className="confirmation">
            <span className="start">Unlocked (Withdrawal enabled)</span>
            <span className="end">2 Confirmation</span>
          </div>
        </div>
        <div className="nft">
          <div className="error-nft">
            <ErrorIcon />
            <p>Don't send NFT to this address.</p>
          </div>
          <p>
            Deposit via smart contracts are not supported with the exception of
            ETH via ERC20. Arbitrum $ Optimism network or BNB via BSC network
          </p>
        </div>
      </div>
    </>
  );
};
export default Deposit;
