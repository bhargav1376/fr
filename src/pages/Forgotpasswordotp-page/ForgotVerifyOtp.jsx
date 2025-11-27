import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { post } from "../../services/api";
import "./ForgotVerifyOtp.css";
import videosignup from "../video.mp4";
import iconimage from "../icon-image.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NotFoundSVG from "../../404error/NotFoundSVG.jsx";

function ForgotVerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;

  // ------------------ HOOKS ------------------
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
    submit: "",
  });

  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(5);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ------------------ REDIRECT WHEN EMAIL MISSING ------------------
  useEffect(() => {
    if (!email) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(redirectTimer);
      };
    }
  }, [email, navigate]);

  // ------------------ VALIDATIONS ------------------
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!password) return "Password is required";

    if (!regex.test(password))
      return "Password must be at least 8 characters and contain 1 uppercase, 1 number, and 1 special character";

    return "";
  };

  const validateConfirmPassword = (value) => {
    if (!value) return "Confirm password is required";
    if (value !== password) return "Passwords do not match";
    return "";
  };

  // ------------------ SUBMIT ------------------
  const handleReset = async (e) => {
    e.preventDefault();

    const passErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(confirmPassword);

    if (passErr || confirmErr) {
      setErrors({
        ...errors,
        password: passErr,
        confirmPassword: confirmErr,
      });
      return;
    }

    try {
      await post("/reset-password", { email, otp, newPassword: password });

      setSuccess("Password updated successfully ✔");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setErrors({ ...errors, submit: err.message });

      setTimeout(() => {
        setErrors((prev) => ({ ...prev, submit: "" }));
      }, 2500);
    }
  };

  // ------------------ MISSING EMAIL PAGE ------------------
  if (!email) {
    return (
      <div className="notfound-container">
        <NotFoundSVG countdown={countdown} navigate={navigate} />
      </div>
    );
  }

  // ------------------ MAIN UI ------------------
  return (
    <div className="forgot-verify-container">

      <video autoPlay loop muted playsInline className="verify-bg-video">
        <source src={videosignup} type="video/mp4" />
      </video>

      <div className="forgot-verify-card glass-card fade-in">

        <div className="logo-login-group">
          <img src={iconimage} className="login-logo" alt="Family Tree" />
          <h1 className="login-main-title">Family Tree</h1>
        </div>

        <h2 className="login-title">Reset Your Password</h2>
        <p className="login-subtitle">Enter the OTP and create a new password.</p>

        <form className="verify-form" onSubmit={handleReset}>

          {/* OTP */}
          <div className="otp-input-group">
            <input
              type="text"
              placeholder="Enter OTP"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className={`password-group ${errors.password ? "has-error" : ""}`}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className="password-error-msg">{errors.password}</p>}

          {/* CONFIRM PASSWORD */}
          <div className={`password-group ${errors.confirmPassword ? "has-error" : ""}`}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="password-error-msg">{errors.confirmPassword}</p>
          )}

          <button type="submit" className="btn-neon-reset">
            <span></span><span></span><span></span><span></span>
            Reset Password
          </button>

          <p className="back-to-login">
            Remember your password?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>

        {success && <div className="toast-success">{success}</div>}
        {errors.submit && <div className="toast-error">{errors.submit}</div>}
      </div>
    </div>
  );
}

export default ForgotVerifyOtp;
