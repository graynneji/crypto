// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./market.style.css";

// const Market = ({ datas }) => {
//   return (
//     <div className="market-container">
//       <div className="fx">
//         <p>Wishlist</p>
//         <p>Coin</p>
//       </div>
//       <div className="market-header">
//         <p>Hot</p>
//         <p>Market Cap</p>
//         <p>Price</p>
//         <p>24h Change</p>
//         <p>Market</p>
//       </div>
//       {datas.map((data) => {
//         return (
//           <div className="market-data" key={data.symbol}>
//             <div className="coin-symbol-name">
//               <p className="coin-name">{data.name}</p>
//               <p className="coin-symbol">{data.symbol.toUpperCase()}</p>
//             </div>

//             <p className="coin-name coin-price">${data.price}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default Market;
