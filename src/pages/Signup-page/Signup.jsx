import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../services/api";
import "./Signup.css";
import videosignup from "../video.mp4";
import iconimage from "../icon-image.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();
   useEffect(() => {
    document.title = "Family Tree | Signup";
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    submit: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");


  // ------------------ Validation ------------------
  const validateName = (name) => {
  const regex = /^[A-Za-z ]+$/; // allows only letters and spaces

  if (!name.trim()) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters";
  if (!regex.test(name)) return "Name can contain only letters";
  return "";
};


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!regex.test(email)) return "Enter a valid email";
    return "";
  };

 const validatePassword = (password) => {
  const regex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  if (!password) return "Password is required";

  if (!regex.test(password))
    return "Password must be at least 8 characters and contain 1 uppercase, 1 number, and 1 special character";

  return "";
};


  const validateConfirmPassword = (confirm) => {
    if (!confirm) return "Confirm password is required";
    if (confirm !== form.password) return "Passwords do not match";
    return "";
  };

  // ------------------ Change Handler ------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    let err = "";
    if (name === "name") err = validateName(value);
    if (name === "email") err = validateEmail(value);
    if (name === "password") err = validatePassword(value);
    if (name === "confirmPassword") err = validateConfirmPassword(value);

    setErrors({ ...errors, [name]: err });
  };

  // ------------------ Submit Handler ------------------
  const handleSignup = async (e) => {
  e.preventDefault();

  const nameErr = validateName(form.name);
  const emailErr = validateEmail(form.email);
  const passErr = validatePassword(form.password);
  const confirmErr = validateConfirmPassword(form.confirmPassword);

  if (nameErr || emailErr || passErr || confirmErr) {
    setErrors({
      name: nameErr,
      email: emailErr,
      password: passErr,
      confirmPassword: confirmErr,
      submit: "",
    });
    return;
  }

  const payload = {
    name: form.name,
    email: form.email,
    password: form.password,
  };

  try {
    setIsSubmitting(true);            // 🔥 BUTTON → signing...
    await post("/signup", payload);

    // 🔥 OTP sent success message
    setSuccess("OTP sent successfully ✔ Check your email!");

    setTimeout(() => {
      navigate("/signup/verify-otp", { state: { email: form.email } });
    }, 1500);

  } catch (err) {
    setErrors({ ...errors, submit: err.message });

    setTimeout(() => {
      setErrors((prev) => ({ ...prev, submit: "" }));
    }, 1500);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="family-tree-container">
      <video autoPlay loop muted playsInline className="bg-video">
        <source src={videosignup} type="video/mp4" />
      </video>

      <div className="auth-card-parent">
        <div className="auth-wrapper">
          <div className="auth-card glass-card fade-in">
            {/* <div className="tittle-name">
              <h1 className="family-tree-title">Family Tree</h1>
            </div>
            <div className="logo-container">
              <div className="img-display">
                <img
                src={iconimage}
                alt="Family Tree Logo"
                className="logo-image"
              />
              </div>
              <div className="matter-logo">
                <h2 className="title">Create Your Account</h2>
              <p className="subtitle">
                Join and start building your family tree.
              </p>
              </div>
            </div> */}

            <div className="logo-login-group">
                <img src={iconimage} className="login-logo" alt="Family Tree" />
                <h1 className="login-main-title">Family Tree</h1>
            </div>
                   
              <h2 className="login-title">Create Your Account</h2>
              <p className="login-subtitle">Join and start building your family tree.</p>

            <form className="auth-form" onSubmit={handleSignup}>

              {/* NAME */}
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <p className="error-msg">{errors.name}</p>}
              </div>

              {/* EMAIL */}
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="error-msg">{errors.email}</p>}
              </div>

              {/* PASSWORD */}
              <div className={`password-group ${errors.password ? "has-error" : ""}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create Password"
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
              {errors.password && (
                <p className="password-error-msg">{errors.password}</p>
              )}

              {/* CONFIRM PASSWORD */}
              <div className={` password-group-confirm  password-group ${errors.confirmPassword ? "has-error" : ""}`}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
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

             <button 
              type="submit" 
              className="btn-neon" 
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
            >
              {isSubmitting ? "Signing..." : "Sign Up"}

              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>


            </form>

            <p className="login-redirect">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}>Login</span>
            </p>
          </div>
        </div>
      </div>
        {errors.submit && ( <div className="toast-error"> {errors.submit} </div> )}
        {success && <div className="toast-success">{success}</div>}
    </div>
    
  );
}

export default Signup;
