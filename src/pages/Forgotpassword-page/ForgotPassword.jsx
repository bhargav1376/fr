import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../services/api";
import "./ForgotPassword.css";
import videosignup from "../video.mp4";
import iconimage from "../icon-image.png";

function ForgotPassword() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Family Tree | Forgot Password";
  }, []);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!regex.test(email)) return "Enter a valid email";
    return "";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      setTimeout(() => setError(""), 2500);
      return;
    }

    try {
      setSending(true);

      await post("/forgot-password", { email });

      setSuccess("OTP sent successfully ✔");
      setTimeout(() => {
        navigate("/forgot-password/verify-otp", { state: { email } });
      }, 1500);

    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 2500);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="forgot-container">

      <video autoPlay loop muted playsInline className="forgot-bg-video">
        <source src={videosignup} type="video/mp4" />
      </video>

      <div className="forgot-card glass-card-forgot fade-in-forgot">

        <div className="logo-login-group">
          <img src={iconimage} className="login-logo" alt="Family Tree" />
          <h1 className="login-main-title">Family Tree</h1>
        </div>

        <h2 className="login-title">Forgot Password?</h2>
        <p className="login-subtitle">Enter your email to receive a verification code.</p>

        <form className="forgot-form" onSubmit={handleSend}>
          <div className="otp-input-group">
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="forgot-error-msg">{error}</p>}

          <button type="submit" className="btn-neon-forgot" disabled={sending}>
            {sending ? "Sending..." : "Send OTP"}
            <span></span><span></span><span></span><span></span>
          </button>
        </form>

        <p className="back-to-login">
          Remember your password?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
       {success && <div className="toast-success">{success}</div>}

        {error && <div className="toast-error">{error}</div>}
    </div>
  );
}

export default ForgotPassword;
