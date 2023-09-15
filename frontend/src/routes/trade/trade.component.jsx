import "./trade.style.css";
import axios from "axios";
import Button from "../../components/button/button.component";
import TradeInput from "../../components/trade-input/trade-input.component";
import Subscribe from "../../components/subscribe/subscribe.component";

const Trade = () => {
  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:9000", {
      // userId: userId,
      // email: email,
    });
  };
  const data = 34;
  return (
    <>
      <div className="trade-dashboard">
        <p className="trade-header">
          Earn <br />
          stable <br />
          income
        </p>
        <Subscribe
          percentage="14%"
          plan="Silver"
          minimumDigit="0.009345 BTC"
          inUsd="$ 1,000"
        />
        {/* <Subscribe
          percentage="24%"
          plan="Bronze"
          minimumDigit="1.345029 BTC"
          inUsd="$ 5,000"
        />
        <Subscribe
          percentage="40%"
          plan="Gold"
          minimumDigit="1.345029 BTC"
          inUsd="$ 10,000"
        /> */}
      </div>
    </>
  );
};
export default Trade;
