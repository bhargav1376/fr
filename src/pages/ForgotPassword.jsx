import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://backend-jv5v.onrender.com/api/auth";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      navigate("/forgot-password/verify-otp", { state: { email } });

    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSendOtp} className="form">
        <input type="email" placeholder="Your Email"
          value={email} onChange={(e) => setEmail(e.target.value)} required />

        <button type="submit">Send OTP</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ForgotPassword;
