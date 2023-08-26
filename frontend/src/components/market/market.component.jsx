import React, { useEffect, useState } from "react";
import axios from "axios";
// import io from "socket.io-client";
import "./market.style.css";

// const socket = io("http://127.0.0.1:9000");

// socket.on("connect", () => {
//   console.log("connected");
// });

const Market = ({ datas }) => {
  // const [datas, setDatas] = useState([]);

  // console.log(datas);
  // useEffect(() => {
  //   try {
  //     socket.on("crypto", (data) => {
  //       console.log("connected");
  //       setDatas(data);
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //   }

  //   return () => {
  //     socket.close();
  //   };
  // }, []);
  return (
    <div className="market-container">
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
      {datas.map((data) => {
        return (
          <div className="market-data" key={data.symbol}>
            <div className="coin-symbol-name">
              <p className="coin-name">{data.name}</p>
              <p className="coin-symbol">{data.symbol.toUpperCase()}</p>
            </div>
            {/* <p>{data.percentChange.toFixed(2)}%</p> */}
            <p className="coin-name coin-price">${data.price}</p>
          </div>
        );
      })}
      {/* {Object.keys(datas).map((key) => (
        <div key={key}>
          <p>Symbol: {datas[key].symbol}</p>
          <p>Price: {datas[key].price}</p>
        </div> */}
      {/* ))} */}
    </div>
  );
};
export default Market;
