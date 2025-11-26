import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://backend-jv5v.onrender.com/api/auth";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      navigate("/login/verify-otp", { state: { email: form.email } });

    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin} className="form">
        <input type="email" name="email" placeholder="Email"
          value={form.email} onChange={handleChange} required />

        <input type="password" name="password" placeholder="Password"
          value={form.password} onChange={handleChange} required />

        <button type="submit">Login</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
