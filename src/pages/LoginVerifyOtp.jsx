import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const API_URL = "https://backend-jv5v.onrender.com/api/auth";

function LoginVerifyOtp() {
  const { state } = useLocation();
  const email = state?.email;

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/verify-login-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      setMessage("Login successful ✔");
      localStorage.setItem("token", data.token);

    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div>
      <h2>Verify Login OTP</h2>
      <p>OTP sent to: <b>{email}</b></p>

      <form onSubmit={handleVerify} className="form">
        <input type="text" placeholder="Enter OTP"
          value={otp} onChange={(e) => setOtp(e.target.value)} required />

        <button type="submit">Verify OTP</button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default LoginVerifyOtp;
