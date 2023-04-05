import React from "react";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Verify from "./components/Verify/Verify";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Practice from "./components/Dashboard/Practice";


function App() {
  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/verify" element={<Verify />} />
          <Route exact path="/forgot_password" element={<ForgotPassword />} />
          <Route exact path="/reset_password" element={<ResetPassword />} />
          <Route exact path="/practice" element={<Practice />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;