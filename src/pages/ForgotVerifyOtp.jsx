import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const API_URL = "https://backend-jv5v.onrender.com/api/auth";

function ForgotVerifyOtp() {
  const { state } = useLocation();
  const email = state?.email;

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      setMessage("Password reset successful!");
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <p>OTP sent to: <b>{email}</b></p>

      <form onSubmit={handleReset} className="form">
        <input type="text" placeholder="Enter OTP"
          value={otp} onChange={(e) => setOtp(e.target.value)} required />

        <input type="password" placeholder="New Password"
          value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

        <button type="submit">Reset Password</button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ForgotVerifyOtp;
