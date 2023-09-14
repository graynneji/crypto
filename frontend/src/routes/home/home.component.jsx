import "./home.style.css";
import Button from "../../components/button/button.component";
import Market from "../../components/market/market.component";
import Header from "../../components/header/header.component";
import Nav from "../../components/nav/nav.component";
export default function Home() {
  return (
    <div className="home-container">
      <p className="welcome">Welcome to G-XTrade</p>
      <div className="auth-btn">
        <Button type={"button"} buttonType={"login"}>
          Log In
        </Button>
        <Button type={"button"} buttonType={"register"}>
          Sign up
        </Button>
      </div>
      {/* <Market /> */}
      {/* <Nav /> */}
    </div>
  );
}
