import "./button.style.css";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  buy: "buy-btn",
  sell: "sell-btn",
  withdraw: "withdraw",
  deposit: "deposit",
  login: "login",
  register: "register",
  mainLogin: 'mainLogin',
  mainregister: 'mainRegister'
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}>
      {children}
    </button>
  );
};
export default Button;
