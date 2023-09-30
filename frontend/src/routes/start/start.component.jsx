import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/button.component";
import TradeSuccessModal from "../../components/modal/modal.component";
import "./start.style.css";
const Start = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    percentage = "",
    plans = "",
    minimumDigit = "",
    inUsd = "",
    features = "",
  } = location.state || {};
  useEffect(() => {
    if (location.state === null) {
      navigate("/trade");
    }
  });
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const user = JSON.parse(storedUser);
    setUserData(user);
  }, []);

  useEffect(() => {}, []);
  console.log(userData?.accessToken);
  console.log(userData?.others?.email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request with the selected plan and amount
      const response = await axios.post(
        "http://localhost:9000/api/v1/trade",
        {
          email: userData?.others?.email,
          plan: plans.toLowerCase(),
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.accessToken}`,
          },
        }
      );
      console.log("Subscription successful:", response.data);
      setIsModalOpen(true);
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formattedFunds = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const readOnlyFields = [
    { label: "Minimum Amount", value: inUsd },
    { label: "Percentage", value: percentage },
    { label: "Features", value: features },
    { label: "Fees", value: "$0.00" },
  ];
  return (
    <div className="start-container">
      <div className="subscription-form-page">
        <form onSubmit={handleSubmit}>
          <h2>Subscribe to {plans}</h2>
          <div className="amount-input">
            <label>Amount</label>
            <input
              className="trade-amount-input"
              type="number"
              placeholder="Minimum amount"
              min="1000"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <span style={{ color: "red", fontSize: "1rem" }}>{error}</span>
            <span style={{ fontSize: "1rem" }}>
              ≈ {formattedFunds.format(amount)}
            </span>
            <span style={{ fontSize: "1rem" }}>
              Balance &nbsp;
              {formattedFunds.format(userData?.others?.funds?.available)}
            </span>
          </div>

          {readOnlyFields.map((field, index) => (
            <div className="read-only" key={index}>
              <label>{field.label}</label>
              <input type="text" value={field.value} readOnly />
            </div>
          ))}

          <Button buttonType="starts" type="submit">
            Invest
          </Button>
        </form>
      </div>
      <TradeSuccessModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Start;
