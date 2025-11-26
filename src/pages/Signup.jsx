import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://backend-jv5v.onrender.com/api/auth";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      // Move to OTP page
      navigate("/signup/verify-otp", { state: { email: form.email } });

    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSignup} className="form">
        <input type="text" name="name" placeholder="Name"
          value={form.name} onChange={handleChange} required />

        <input type="email" name="email" placeholder="Email"
          value={form.email} onChange={handleChange} required />

        <input type="password" name="password" placeholder="Password"
          value={form.password} onChange={handleChange} required />

        <button type="submit">Signup</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Signup;
