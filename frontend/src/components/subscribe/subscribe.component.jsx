import "./subscribe.style.css";
import Button from "../button/button.component";

const Subscribe = ({ percentage, plan, minimumDigit, inUsd }) => {
  return (
    <>
      <div>
        <div className="sub-details">
          <div className="subscription-card">
            <p>BTC/USDT</p>
            <span className="plan">{plan}</span>
            <span className="min-amount">Minimum amount:</span>
            <Button type="button" buttonType="subscribe">
              Subscribe
            </Button>
            {/* <button className="btn" type="submit">
                Subscribe
              </button> */}
            <span className="min-digits">
              {minimumDigit} <p>{inUsd}</p>
            </span>
            <span className="percentage-subscribe">{percentage}</span>
            <p className="feautures">
              Monthly dividends, investment locked for 2 years
            </p>
          </div>
        </div>

        {/* <form className="sub-details" method="POST" action="">
            <TradeInput type="text" value="BTC/USDT" name="bitcoin" />
            <div>
              <TradeInput type="text" value="0.2377118 BTC" name="btc" />
            </div>
            <TradeInput />
            <TradeInput />
            <TradeInput />
            <TradeInput />
            <TradeInput />
          </form> */}
      </div>
    </>
  );
};

export default Subscribe;
