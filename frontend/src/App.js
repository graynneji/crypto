import { Routes, Route } from "react-router-dom";
import "./App.css";
import Deposit from "./routes/deposit/deposit.component"
import Auth from "./routes/authentication/authentication.component";
import Layout from "./components/layout/layout.component";
import Home from "./routes/home/home.component";
import Header from './components/header/header.component'
import Dashboard from "./routes/dashboard/dashboard.component";
import RequireAuth from "./utils/requireAuth";
import Trade from './routes/trade/trade.component'
import Earn from "./routes/earn/earn.component"
import Start from "./routes/start/start.component"

function App() {

  return (
  
    <Layout>
      <Routes>
        <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/earn" element={<Earn />}/>
          <Route path="/start" element={<Start/>}/>
          <Route path="/trade" element={<Trade />}/>
          {/* protected route */}
          <Route  element={<RequireAuth />} >
          <Route path="/deposit" element={<Deposit />}/>
      
          </Route>
          </Route>
      </Routes>
    </Layout>
 
  );
}

export default App;
