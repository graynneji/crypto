import "./earn.style.css";
import React, { useState, useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock";

const Earn = () => {
  // Check if there is user data in localStorage

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
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
  const amountTrade = formattedAmount.format(userData?.trade[0]?.amount);

  console.log(userData);
  return (
    <>
      <div className="content-container">
        <div className="earn-header">
          <p className="header-earn">Earnings</p>
        </div>
        <p className="total-earnings">Total Earnings</p>
        <p className="total-earnings-amount">+ {dividend}</p>
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
                  + {formattedAmount.format(data?.dividendAmount)}
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
      </div>
    </>
  );
};
export default Earn;
