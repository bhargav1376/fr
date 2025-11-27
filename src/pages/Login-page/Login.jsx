import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../services/api";
import "./Login.css";
import videosignup from "../video.mp4";
import iconimage from "../icon-image.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Family Tree | Login";
  }, []);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  // Handle text input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setIsSubmitting(true);

      const res = await post("/login", form);


      localStorage.setItem("username", res.user.name);
      localStorage.setItem("useremail", res.user.email);

      setSuccess("Login successful ✔ Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">

      {/* Background video */}
      <video autoPlay loop muted playsInline className="login-bg-video">
        <source src={videosignup} type="video/mp4" />
      </video>

      <div className="login-card glass-card fade-in">

        {/* Logo + Title */}
        <div className="logo-login-group">
          <img src={iconimage} className="login-logo" alt="Family Tree" />
          <h1 className="login-main-title">Family Tree</h1>
        </div>

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue your family journey</p>

        <form className="login-form" onSubmit={handleLogin}>

          {/* EMAIL */}
          <div className="input-group">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="password-group">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Remember / Forgot */}
          <div className="rem-flex">
            <div className="rem-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe" className="rememberMe">
                Remember Me
              </label>
            </div>

            <div className="forgot-pass">
              <p
                className="forgot-text"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </p>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="btn-neon"
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? "Logging in..." : "Login"}
            <span></span><span></span><span></span><span></span>
          </button>

        </form>

        {/* Create account */}
        <p className="create-account-text">
          New here?{" "}
          <span onClick={() => navigate("/signup")}>Create an account</span>
        </p>

      </div>
       {error && <div className="toast-error">{error}</div>}
        {success && <div className="toast-success">{success}</div>}
    </div>
  );
}

export default Login;
