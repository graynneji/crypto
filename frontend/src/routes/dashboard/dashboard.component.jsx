import "./dashboard.style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userInfo } from "../../utils/authActions";
import "./dashboard.style.css";
import Market from "../../components/market/market.component";
import io from "socket.io-client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MoveUpRoundedIcon from "@mui/icons-material/MoveUpRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import CandlestickChartRoundedIcon from "@mui/icons-material/CandlestickChartRounded";
import SkelentonLoaderWithImage from "../../components/skelentonLoader/skelentonLoaderWithImage.component";
import SkelentonLoaderTextOnly from "../../components/skelentonLoader/skelentonLoaderText.component";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Dashboard = () => {
  const [dividend, setDividend] = useState(null);

  const dispatch = useDispatch();

  const [datas, setDatas] = useState([]);
  const [error, setError] = useState("");

  const [userData, setUserData] = useState(null);

  const [isEye, setIsEye] = useState(false);

  useEffect(() => {
    const storedIsEye = localStorage.getItem("updatedIsEye");
    if (storedIsEye !== null) {
      setIsEye(storedIsEye === "true"); // Convert the stored value to a boolean
    }
  }, []);
  const handleEye = () => {
    console.log("eye");
    const updatedIsEye = !isEye;
    setIsEye(updatedIsEye);
    localStorage.setItem("updatedIsEye", updatedIsEye);
  };

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      // If data is found in localStorage, parse and set it in the state
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const user = JSON.parse(storedUser);
    console.log("User from local storage:", user);
    // const { accessToken, others: { _id } } = user;
    const accessToken = user?.accessToken;
    const userId = user?.others?._id;

    // Fetch user from API
    const handleFetch = async (accessToken, userId) => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        dispatch(userInfo(res.data));
        sessionStorage.setItem("userData", JSON.stringify(res.data));
        const storedUserData = sessionStorage.getItem("userData");
        setUserData(JSON.parse(storedUserData));
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    handleFetch(accessToken, userId);
  }, []);

  //OLDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD

  //  Socket io to transmit live crypto price tickers
  console.log(userData?.others?.firstName);
  useEffect(() => {
    console.log("useEffect");
    const socket = io("http://localhost:9000");
    socket.on("crypto", (newData) => {
      setDatas(newData);
    });

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);
  console.log(datas);
  // useEffect(() => {
  //   const socket = io("http://localhost:9000");
  //   socket.on("dividend", (data) => {
  //     setDividend(data);
  //     console.log(data);
  //   });
  //   return () => {
  //     if (socket) {
  //       socket.close();
  //     }
  //   };
  // }, []);
  // console.log(dividend);

  //calculate the price in BTC
  const handleex = datas
    .filter((fil) => fil.symbol === "btc")
    .map((data) => data.price);

  const welcome = `${userData?.user?.firstName}`;
  const UID = `${userData?.user?._id?.slice(0, 9)}`;
  const funds = userData?.user?.funds?.available;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(funds);

  const priceInBtc = funds / handleex;
  console.log(
    `amount ${formattedAmount}, btcamount ${handleex}, priceBtc ${priceInBtc}`
  );

  const loader = (
    <>
      <SkelentonLoaderWithImage />
      {[...Array(8).keys()].map((_, i) => (
        <SkelentonLoaderTextOnly key={i} />
      ))}
    </>
  );

  const content = (
    <section className="dashboard-container">
      <div className="actions">
        <Link to="/deposit">Deposit</Link>
        <Link to="/withdraw">Withdrwal</Link>
        <Link to="/trade">Investment</Link>
      </div>
      <header className="grid-header-dashboard">
        <p className="uid">UID: {UID.toUpperCase()}</p>
        <div className="h1">
          <div className="faded-icon">
            <AccountBalanceRoundedIcon
              style={{
                fontSize: "20rem",
                color: "#ffffff09",
              }}
            />
          </div>
          <AccountCircleIcon style={{ fontSize: "5rem", color: "#ffffff60" }} />
          <h1>Welcome {welcome}</h1>
        </div>
        <div className="prices">
          {/* <div className="eye-price-show"> */}
          <p className="price">{formattedAmount}</p>

          {/* {isEye ? (
              <RemoveRedEyeIcon
                onClick={handleEye}
                style={{
                  fontSize: "1.5rem",
                  color: "#ffffff",
                  zindex: "99999",
                }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={handleEye}
                style={{
                  fontSize: "1.5rem",
                  color: "#ffffff",
                  zindex: "99999",
                }}
              />
            )} */}
          {/* </div> */}

          <p className="btc-price">
            {priceInBtc == "Infinity" ? "0.00000000" : priceInBtc.toFixed(8)}{" "}
            BTC
          </p>
        </div>
      </header>
      <div className="icons-menu">
        <Link to="/earn">
          <div className="icon-container">
            <div className="icon">
              <SavingsRoundedIcon style={{ fontSize: "3rem" }} />
            </div>

            <div>
              <p className="p-icon-name">Earn</p>
            </div>
          </div>
        </Link>

        <Link to="/referal">
          <div className="icon-container">
            <div className="icon">
              <MoveUpRoundedIcon style={{ fontSize: "3rem" }} />
            </div>
            <div>
              <p className="p-icon-name">Referal</p>
            </div>
          </div>
        </Link>

        <Link to="/market">
          <div className="icon-container">
            <div className="icon">
              <AssessmentRoundedIcon style={{ fontSize: "3rem" }} />
            </div>
            <div>
              <p className="p-icon-name">Market</p>
            </div>
          </div>
        </Link>

        <Link to="/trade">
          <div className="icon-container">
            <div className="icon">
              <CandlestickChartRoundedIcon style={{ fontSize: "3rem" }} />
            </div>
            <div>
              <p className="p-icon-name">Trade</p>
            </div>
          </div>
        </Link>
      </div>

      <Market datas={datas} />
    </section>
  );

  return !userData ? loader : content;
  // return content;
};

export default Dashboard;
