import "./button.style.css";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  buy: "buy-btn",
  sell: "sell-btn",
  withdrawal: "withdrawal",
  deposit: "deposit",
  login: "login",
  register: "register",
  mainLogin: "mainLogin",
  mainregister: "mainRegister",
  trade: "trade",
  subscribe: "subscribe",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}>
      {children}
    </button>
  );
};
export default Button;
