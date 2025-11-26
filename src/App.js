import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Signup from './pages/Signup';
import SignupVerifyOtp from './pages/SignupVerifyOtp';
import Login from './pages/Login';
import LoginVerifyOtp from './pages/LoginVerifyOtp';
import ForgotPassword from './pages/ForgotPassword';
import ForgotVerifyOtp from './pages/ForgotVerifyOtp';

function App() {
  return (
    <div className="app">
      <h1>Auth System</h1>

      {/* Navigation */}
      <nav>
        <Link to="/signup">Signup</Link> | 
        <Link to="/login">Login</Link> | 
        <Link to="/forgot-password">Forgot Password</Link>
      </nav>

      <Routes>
         <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/verify-otp" element={<SignupVerifyOtp />} />

        <Route path="/login" element={<Login />} />
        <Route path="/login/verify-otp" element={<LoginVerifyOtp />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/verify-otp" element={<ForgotVerifyOtp />} />
      </Routes>
    </div>
  );
}

export default App;
