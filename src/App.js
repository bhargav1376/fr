import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup-page/Signup";
import SignupVerifyOtp from "./pages/Signupotp-page/SignupVerifyOtp";
import Login from "./pages/Login-page/Login";
import ForgotPassword from "./pages/Forgotpassword-page/ForgotPassword";
import ForgotVerifyOtp from "./pages/Forgotpasswordotp-page/ForgotVerifyOtp";
import Dashboard from "./component/Familytree/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/verify-otp" element={<SignupVerifyOtp />} />

      <Route path="/login" element={<Login />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/verify-otp" element={<ForgotVerifyOtp />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
