// import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// import auth from "./components/login.component";
import Auth from "./routes/authentication/authentication.component";
import Layout from "./components/layout/layout.component";
import Home from "./routes/home/home.component";
import Header from './components/header/header.component'
import Dashboard from "./routes/dashboard/dashboard.component";
// import useSocket from "./utils/socket";
function App() {
  // const datas = useSocket();
  return (
  
    <Layout>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Layout>
 
  );
}

export default App;
