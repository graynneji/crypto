import "./trade-input.style.css";

const TradeInput = ({ type, value, name }) => {
  // const userId = localStorage
  return (
    <>
      <div className="subscription-card">
        <input className="trade-input" type={type} value={value} />
      </div>
    </>
  );
};
export default TradeInput;
