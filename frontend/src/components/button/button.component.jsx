import "./button.style.css";

const BUTTON_TYPE_CLASSES = {
  google: "google-btn",
  buy: "buy-btn",
  sell: "sell-btn",
  withdraw: "withdraw",
  deposit: "deposit",
  login: "login",
  register: "register",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <div className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}>
      {children}
    </div>
  );
};
export default Button;
