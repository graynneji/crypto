import "./trade.style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/button/button.component";
import TradeInput from "../../components/trade-input/trade-input.component";
import Subscribe from "../../components/subscribe/subscribe.component";
import { useEffect } from "react";
import trade from "../../assets/financial-profit.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const Trade = () => {
  const [showBtc, setShowBtc] = useState(null);
  const [userData, setUserData] = useState(false);
  const navigate = useNavigate();
  const [formattedBalance, setFormattedBalance] = useState("$0.00");
  const [selectedSubscription, setSelectedSubscription] = useState({
    plan: "",
    minimumDigit: "",
    inUsd: "",
    percentage: "",
  });
  const handleShowClick = () => {
    setShowBtc(!showBtc);
  };
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const user = JSON.parse(storedUser);
    const userId = user?.others?._id;
    const accessToken = user?.accessToken;
    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(res.data);
        setUserData(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchBalance();
  }, []);
  const handleSubscribeClick = (plan, minimumDigit, inUsd, percentage) => {
    setSelectedSubscription({
      plan,
      minimumDigit,
      inUsd,
      percentage,
    });
    navigate("/start");
  };

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <div className="trade-dashboard">
        <div className="trade-header-head">
          <img className="trade-image" src={trade} alt="trade-logo" />
          <p className="trade-header">
            Earn <br />
            stable <br />
            income
          </p>
        </div>

        <div className="available-balance">
          <div className="balance">
            <p>Balance</p>
            <div>
              <span>
                {!isNaN(userData?.user?.funds?.available)
                  ? formattedAmount.format(userData?.user?.funds?.available)
                  : "$0.00"}
              </span>
              {!showBtc ? (
                <ArrowDropDownIcon
                  onClick={handleShowClick}
                  style={{ fontSize: "2rem" }}
                />
              ) : (
                <ArrowDropUpIcon
                  onClick={handleShowClick}
                  style={{ fontSize: "2rem" }}
                />
              )}
              <p id="show-btc-trade">{showBtc ? "1.3948439 BTC" : ""}</p>
            </div>
          </div>
          <div>
            <Button buttonType="deposit">Deposit</Button>
          </div>
        </div>
        <p className="plans-plans">Plans</p>
        <div className="subscribe-plans">
          <Subscribe
            percentage="14%"
            plans="Bronze"
            minimumDigit="0.009345 BTC"
            inUsd="$ 1,000"
            features="Monthly rewards, investment locked for 6 months"
            onSubscribeClick={() =>
              handleSubscribeClick("Silver", "0.009345 BTC", "$ 1,000", "14%")
            }
          />
          <Subscribe
            percentage="24%"
            plans="Silver"
            minimumDigit="1.345029 BTC"
            inUsd="$ 5,000"
            features="Monthly rewards, investment locked for 1 year"
            onSubscribeClick={() =>
              handleSubscribeClick("Silver", "0.009345 BTC", "$ 1,000", "24%")
            }
          />
          <Subscribe
            percentage="40%"
            plans="Gold"
            minimumDigit="1.345029 BTC"
            inUsd="$ 10,000"
            features="Monthly rewards, investment locked for 2 years"
            onSubscribeClick={handleSubscribeClick}
          />
        </div>
      </div>
    </>
  );
};
export default Trade;
