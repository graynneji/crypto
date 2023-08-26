// import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// import auth from "./components/login.component";
import Auth from "./routes/authentication/authentication.component";
import Layout from "./components/layout/layout.component";
import Home from "./routes/home/home.component";
import Menu from "./routes/menu/menu.component";
import useSocket from "./utils/socket";
function App() {
  const datas = useSocket();
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<Home datas={datas} />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
