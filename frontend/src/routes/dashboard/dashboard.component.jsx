import "./dashboard.style.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../../utils/authActions";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userInfo } from "../../utils/authActions";
import "./dashboard.style.css";
import Market from "../../components/market/market.component";
import io from "socket.io-client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "../../components/button/button.component";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MoveUpRoundedIcon from "@mui/icons-material/MoveUpRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import CandlestickChartRoundedIcon from "@mui/icons-material/CandlestickChartRounded";
import CryptoPriceChart from "../../components/chart/chart.component";

const Dashboard = () => {
  const cryptoData = [10, 12, 15, 14, 16, 18, 20, 22, 25, 24];

  const [dividend, setDividend] = useState(null);
  // localStorage.removeItem("userData");
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.auth.user);
  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector(selectCurrentToken);
  localStorage.setItem("id", user);
  localStorage.setItem("token", accessToken);
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  //NEWWW CONSTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
  const [currentPrice, setCurrentPrice] = useState(null);
  const [initialPrice, setInitialPrice] = useState(null);
  const [percentageChange, setPercentageChange] = useState(null);
  const currentPriceRef = useRef(currentPrice);
  const initialPriceRef = useRef(initialPrice);
  //NEWWW CONSTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT

  // useEffect(() => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userData");
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    console.log(token, userId);
    const handleFetch = async (userId, token) => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(userInfo(res.data));
        console.log(res.data);
        localStorage.setItem("userData", JSON.stringify(res.data));
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    // Check if there is user data in localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      // If data is found in localStorage, parse and set it in the state
      setUserData(JSON.parse(storedUserData));
    } else {
      // If no data is found, fetch it from the server
      handleFetch(userId, token);
    }
  }, []);

  //OLDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD

  //NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
  console.log(userData?.others?.firstName);
  useEffect(() => {
    console.log("useEffect");
    const socket = io("http://localhost:9000");
    socket.on("crypto", (newData) => {
      setDatas(newData);
      // setDatas((prevData) => [...prevData, newData]);
    });

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);
  console.log(datas);
  console.log(userData);

  useEffect(() => {
    console.log("useuseuse");
    const socket = io("http://localhost:9000");
    socket.on("dividend", (data) => {
      setDividend(data);
      console.log(data);
    });
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);
  console.log(dividend);
  //NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

  //   const welcome = userdata ? `welcome ${data?.others?.firstName}!` : `welcome`;
  const welcome = `${userData?.user?.firstName}`;
  const UID = `${userData?.user?._id?.slice(0, 9)}`;

  const content = (
    <section className="dashboard-container">
      <div className="actions">
        <Button buttonType="deposit">Deposit</Button>
        <Button buttonType="withdrawal">Withdrwal</Button>
        <Button buttonType="trade">Trade</Button>
      </div>
      <header className="grid-header-dashboard">
        <p className="uid">UID: {UID.toUpperCase()}</p>
        {/* <p className="uid">Dividend: $ {userData?.trade[0]?.dividendAmount}</p> */}
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
          {/* <p className="btc-price">0 BTC</p> */}
          <p className="btc-price">0.00384682 BTC</p>
          {/* <p className="btc-price">{userData?.others?.funds?.available} BTC</p> */}
          {/* <p className="price">$ {userData?.others?.funds?.available}</p> */}
          <p className="price">$ 50,000.98</p>
        </div>
      </header>
      <div className="icons-menu">
        <div className="icon-container">
          <div className="icon">
            <SavingsRoundedIcon style={{ fontSize: "3rem" }} />
          </div>
          <div>
            <p className="p-icon-name">Earn</p>
          </div>
        </div>

        <div className="icon-container">
          <div className="icon">
            <MoveUpRoundedIcon style={{ fontSize: "3rem" }} />
          </div>
          <div>
            <p className="p-icon-name">Referal</p>
          </div>
        </div>

        <div className="icon-container">
          <div className="icon">
            <AssessmentRoundedIcon style={{ fontSize: "3rem" }} />
          </div>
          <div>
            <p className="p-icon-name">Market</p>
          </div>
        </div>

        <div className="icon-container">
          <div className="icon">
            <CandlestickChartRoundedIcon style={{ fontSize: "3rem" }} />
          </div>
          <div>
            <p className="p-icon-name">Trade</p>
          </div>
        </div>
      </div>

      <Market datas={datas} />
    </section>
  );

  return userData ? content : <h1>Loading...</h1>;
  // const [error, setError] = useState(null)
  // const accessToken = useSelector(state => state.auth.accessToken)
  // const userId = useSelector((state => state.auth.userId))

  // useEffect( ()=>{
  //     const fetchUser = async ()=>{
  //     try{

  //         const res = await axios.get(`http://localhost:9000/api/v1/user${userId}`, {
  //             headers:{
  //                 Authorization: `Bearer ${accessToken}`
  //             }
  //          })
  //          console.log(res.data)
  //         }catch(err){
  //             console.log(err.response)
  // setError(err.response.data.message)
  //         }
  // }
  //     fetchUser()
  // }, [accessToken, userId])
  //     return (

  //         <div>
  // <h1>{error}</h1>
  //         </div>
  //     )
};

export default Dashboard;

// import { useSelector } from "react-redux/es/hooks/useSelector";
// import { selectCurrentUser, selectCurrentToken } from "../../utils/authActions";

// const Dashboard = () => {
//   const user = useSelector(selectCurrentUser);
//   const token = useSelector(selectCurrentToken);

//   const welcome = user ? `Welcome ${user}!` : `Welcome`;
//   const tokenAbbr = `${token}...`;

//   const content = (
//     <section>
//       <h1>{welcome}</h1>
//       <p>Token: {tokenAbbr}</p>
//     </section>
//   );
//   return content;
// };
// export default Dashboard;
