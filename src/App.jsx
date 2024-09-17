import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Home from "./components/Home.jsx";
import ForgetPassword from "./components/ForgetPassword.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
