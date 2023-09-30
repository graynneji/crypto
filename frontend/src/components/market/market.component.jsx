// // TradingViewWidget.jsx
import React, { useEffect, useRef, memo, useState } from "react";
// import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import numeral from "numeral";
import { Line } from "react-chartjs-2";
import { options } from "../chart/chart.component";
import { data } from "../chart/chart.component";
import { ReactComponent as Bitcoin } from "../../assets/icons8-bitcoin (1).svg";

import "./market.style.css";

// TradingViewWidget.jsx

// let tvScriptLoadingPromise;

// function TradingViewWidget() {
//   const onLoadScriptRef = useRef();

//   useEffect(() => {
//     onLoadScriptRef.current = createWidget;

//     if (!tvScriptLoadingPromise) {
//       tvScriptLoadingPromise = new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.id = "tradingview-widget-loading-script";
//         script.src = "https://s3.tradingview.com/tv.js";
//         script.type = "text/javascript";
//         script.onload = resolve;

//         document.head.appendChild(script);
//       });
//     }

//     tvScriptLoadingPromise.then(
//       () => onLoadScriptRef.current && onLoadScriptRef.current()
//     );

//     return () => (onLoadScriptRef.current = null);

//     function createWidget() {
//       if (
//         document.getElementById("tradingview_dd973") &&
//         "TradingView" in window
//       ) {
//         new window.TradingView.widget({
//           autosize: true,
//           symbol: "COINBASE:BTCUSD",
//           timezone: "Etc/UTC",
//           theme: "dark",
//           style: "1",
//           locale: "en",
//           enable_publishing: false,
//           withdateranges: true,
//           range: "YTD",
//           hide_side_toolbar: false,
//           allow_symbol_change: true,
//           details: true,
//           hotlist: true,
//           calendar: true,
//           container_id: "tradingview_dd973",
//         });
//       }
//     }
//   }, []);

//   return (
//     <div className="tradingview-widget-container">
//       <div id="tradingview_dd973" />
//       <div className="tradingview-widget-copyright">
//         <a
//           href="https://www.tradingview.com/"
//           rel="noopener nofollow"
//           target="_blank"
//         >
//           <span className="blue-text">Track all markets on TradingView</span>
//         </a>
//       </div>
//     </div>
//   );
// }

// export default memo(TradingViewWidget);

const Market = ({ datas }) => {
  const PriceBTC = datas
    .filter((data) => data.symbol === "btc")
    .map((data) => data.price);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // Change this to the appropriate currency code
  }).format(PriceBTC);
  return (
    <>
      <div className="market-container">
        {/* <TradingViewWidget /> */}
        <div className="graph">
          <div className="title-btc-graph">
            <Bitcoin fill="#F7931A" width="35" height="35" />
            <div>
              <p id="btc-usd">Bitcoin</p>
              <p className="usd-usd">
                <span>{formattedPrice}</span> USD
              </p>
              <p
                className="coin-name percentage"
                style={{
                  color: data?.percentageChange < 0 ? "red" : "green",
                }}
              >
                {data?.percentageChange}
              </p>
            </div>
          </div>
          <Line options={options} data={data} />;
        </div>
        <div className="fx">
          <p>Wishlist</p>
          <p>Coin</p>
        </div>
        <div className="market-header">
          <p>Hot</p>
          <p>Market Cap</p>
          <p>Price</p>
          <p>24h Change</p>
          <p>Market</p>
        </div>
        {datas
          ?.filter((_, idx) => idx < 6)
          .map((data) => {
            // const formattedPrice = numeral(data?.price).format("0,0.00");

            const formattedPrice = data?.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            // const formattedPrice = new Intl.NumberFormat("en-US", {
            //   style: "currency",
            //   currency: "USD", // Change this to the appropriate currency code
            // }).format(data?.price);
            return (
              <div className="market-data" key={data?.symbol}>
                <div className="coin-symbol-name">
                  <p className="coin-name">{data?.name}</p>
                  <p className="coin-symbol">{data?.symbol?.toUpperCase()}</p>
                </div>
                <div className="price-percentage">
                  <p
                    className="coin-name percentage"
                    style={{
                      color: data?.percentageChange < 0 ? "red" : "green",
                    }}
                  >
                    {data?.percentageChange} %
                  </p>
                  <p className="coin-name coin-price">${formattedPrice}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="view-more">
        <p>View more</p>
        <div>
          <NavigateNextRoundedIcon style={{ fontSize: "2rem" }} />
        </div>
      </div>
    </>
  );
};
export default Market;
