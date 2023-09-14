// import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Deposit from "./routes/deposit/deposit.component"
// import auth from "./components/login.component";
import Auth from "./routes/authentication/authentication.component";
import Layout from "./components/layout/layout.component";
import Home from "./routes/home/home.component";
import Header from './components/header/header.component'
import Dashboard from "./routes/dashboard/dashboard.component";
import RequireAuth from "./utils/requireAuth";
import Trade from './routes/trade/trade.component'
// import useSocket from "./utils/socket";
function App() {
  // const datas = useSocket();
  return (
  
    <Layout>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          {/* <Route path="/trade" element={<Trade />} /> */}
          <Route path="/trade" element={<Trade />}/>
          <Route path="/deposit" element={<Deposit />}/>

          {/* protected route */}
            <Route  element={<RequireAuth />} >
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/trade" element={<Trade />} /> */}
          </Route>
        </Route>
      </Routes>
    </Layout>
 
  );
}

export default App;
