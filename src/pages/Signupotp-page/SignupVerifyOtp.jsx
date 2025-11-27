import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { post } from "../../services/api";
import "./SignupVerifyOtp.css";
import "./Svganimation.css";
import iconimage from "../icon-image.png";
import videosignup from "../video.mp4";
import NotFoundSVG from "../../404error/NotFoundSVG.jsx";

function SignupVerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = state?.email;

  // ALL HOOKS MUST BE HERE (TOP LEVEL)
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [success, setSuccess] = useState("");


  // Auto-clear error toast
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Auto-redirect if email missing
  useEffect(() => {
    if (!email) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timer = setTimeout(() => {
        navigate("/signup");
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [email, navigate]);

  // Verify OTP Handler
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await post("/verify-otp", { email, otp });
       setSuccess("Email Verified Successfully ✔");
      setTimeout(() => {
       navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------------- MISSING EMAIL PAGE -------------------
  if (!email) {
    return (
      <div className="notfound-container">
        <NotFoundSVG countdown={countdown} navigate={navigate} />;
      </div>
    );
  }

  // ---------------- NORMAL OTP PAGE -------------------
  return (
    <div className="verify-container">

      <video autoPlay loop muted playsInline className="verify-bg-video">
        <source src={videosignup} type="video/mp4" />
      </video>

      <div className="verify-card glass-card-otp fade-in-otp">


                <div className="logo-login-group">
                  <img src={iconimage} className="login-logo" alt="Family Tree" />
                  <h1 className="login-main-title">Family Tree</h1>
                </div>
        
                <h2 className="login-title">Email Verification</h2>
                <p className="login-subtitle">We sent a 6-digit OTP to your email address.</p>


        <form className="verify-form" onSubmit={handleVerify}>
          <div className="otp-input-group email-group-o">
            <input type="email" value={email} readOnly className="email-input" />
          </div>

          <div className="otp-input-group">
            <input
              type="text"
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-neon-otp">
            <span></span><span></span><span></span><span></span>
            Verify OTP
          </button>
        </form>
        <p className="login-redirect">
             Want to create a new account?{" "}
              <span onClick={() => navigate("/signup")}>Sign up</span>
            </p>

       
      </div>
       {error && <div className="toast-error">{error}</div>}
      {success && <div className="toast-success">{success}</div>}
    </div>
  );
}

export default SignupVerifyOtp;
