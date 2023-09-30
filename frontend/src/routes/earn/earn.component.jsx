import "./earn.style.css";
import React, { useState, useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "../../components/button/button.component";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Withdraw from "../../assets/icons8-wallet-100.png";
import SkelentonLoaderWithImage from "../../components/skelentonLoader/skelentonLoaderWithImage.component";
import SkelentonLoaderTextOnly from "../../components/skelentonLoader/skelentonLoaderText.component";

const Earn = () => {
  const navigate = useNavigate();
  // Check if there is user data in localStorage
  const [isEye, setIsEye] = useState(false);

  useEffect(() => {
    const storedIsEye = localStorage.getItem("updatedIsEye");
    if (storedIsEye !== null) {
      setIsEye(storedIsEye === "true"); // Convert the stored value to a boolean
    }
  }, []);
  const handleEye = () => {
    const updatedIsEye = !isEye;
    setIsEye(updatedIsEye);
    localStorage.setItem("updatedIsEye", updatedIsEye);
  };

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      navigate("/auth");
    }
    const user = JSON.parse(storedUser);
    const accessToken = user?.accessToken;
    const userId = user?.others?._id;
    const fetchEarn = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setUserData(res.data);
        // const storedUserData = sessionStorage.getItem("userData");
        // if (storedUserData) {
        //   setUserData(JSON.parse(storedUserData));
        // }
      } catch (err) {}
    };
    fetchEarn();
  }, []);

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // Change this to the appropriate currency code
  });

  const div = userData?.trade?.map((data) => data.dividendAmount);

  const dividendSum = div?.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  const dividend = formattedAmount.format(dividendSum);
  //   const amountTrade = formattedAmount.format(userData?.trade[0]?.amount);

  console.log(userData);

  const loader = (
    <>
      {[...Array(9).keys()].map((_, i) => (
        <SkelentonLoaderTextOnly key={i} />
      ))}

      {/* <SkelentonLoaderTextOnly />
      <SkelentonLoaderTextOnly />
      <SkelentonLoaderTextOnly />
      <SkelentonLoaderTextOnly />
      <SkelentonLoaderTextOnly />
      <SkelentonLoaderTextOnly />
      <SkelentonLoaderTextOnly /> */}
    </>
  );

  const content = (
    <>
      <div className="content-container">
        <div className="earn-header">
          <p className="header-earn">Earnings</p>
          <div>
            <img src={Withdraw} alt="wallet" />
          </div>
        </div>
        <div className="btn-btn-withdraw">
          <div className="btn-withdraw-btn">
            {/* <Link to="/deposit"> */}
            {/* <div className="icon-container"> */}
            {/* <div className="icon"> */}
            {/* <LocalAtmIcon style={{ fontSize: "3rem" }} /> */}
            {/* <span>Withdraw</span> */}
            <Button buttonType="move">Move</Button>
            <Button buttonType="withdrawal">Withdraw</Button>
            {/* </div> */}
            {/* <p>Withdraw</p> */}
            {/* </div> */}
            {/* </Link> */}
          </div>
        </div>
        <div className="total-earnings-amount-head">
          <p className="total-earnings">Total Earnings</p>
          {isEye ? (
            <RemoveRedEyeIcon
              onClick={handleEye}
              className="eye"
              fontSize="2rem"
            />
          ) : (
            <VisibilityOffIcon
              onClick={handleEye}
              className="eye"
              fontSize="2rem"
            />
          )}
        </div>
        <p className="total-earnings-amount">
          {isEye ? `+ ${dividend}` : "+ $ *********"}
        </p>
        <div className="percent-dividend-total-amount">
          <div className="cum-head-main">
            <span className="cum-head">Avg. Percentage</span>
            <span className="avg-dig">+ 0.00</span>
          </div>
          <div className="cum-head-main">
            <span className="cum-head">Cum. Interest</span>
            <span className="cum-dig">0.00</span>
          </div>
        </div>
        {userData?.trade?.map((data) => {
          return (
            <div className="earn" key={data?._id}>
              <div className="earn-content">
                <p className="head-equity">Equity Value</p>
                <p className="amount-of-trade">
                  <LockIcon />
                  {formattedAmount.format(data?.amount)}
                </p>
                <p className="dividends">
                  {isEye
                    ? `+ ${formattedAmount.format(data?.dividendAmount)}`
                    : "+ $ *********"}
                  {/* + {formattedAmount.format(data?.dividendAmount)} */}
                </p>
                <p className="start-date">+{data?.dividendsPercentage}%</p>
                {/* <p>{userData?.trade[0]?.formattedEndDate}</p> */}
                <p className="trade-status">{data?.status}</p>
                <div
                  className={`plan-container ${
                    data?.plan === "gold" ? "gold" : ""
                  } ${data?.plan === "bronze" ? "bronze" : ""}`}
                >
                  <p>{data?.plan.toUpperCase()}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="no-more-entry">
          <p className="no-more-entry">No more entry</p>
        </div>
      </div>
    </>
  );

  return userData ? content : loader;
};
export default Earn;
