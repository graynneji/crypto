import "./subscribe.style.css";
import Button from "../button/button.component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Subscribe = ({
  percentage,
  plans,
  minimumDigit,
  inUsd,
  features,
  onSubscribeClick,
}) => {
  const [plan, setPlan] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    // Log the plans prop
    console.log(plans, percentage);

    // Call the onSubscribeClick function with the prop values
    onSubscribeClick(percentage, plans, minimumDigit, inUsd, features);
    navigate("/start", {
      state: {
        percentage,
        plans,
        minimumDigit,
        inUsd,
        features,
      },
    });
  };

  return (
    <>
      <div>
        <div className="sub-details" onClick={handleClick}>
          <div className="subscription-card">
            <p>BTC/USDT</p>
            <span
              className={`plan ${plans === "Gold" ? "gold" : ""} ${
                plans === "Bronze" ? "bronze" : ""
              }`}
            >
              {plans}
            </span>
            <span className="min-amount">Minimum amount:</span>
            <Button type="button" buttonType="subscribe">
              Subscribe
            </Button>

            <span className="min-digits">
              {minimumDigit} <p>{inUsd}</p>
            </span>
            <span className="percentage-subscribe">{percentage}</span>

            <p className="feautures">{features}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
