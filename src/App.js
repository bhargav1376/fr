// src/App.js
import React, { useState } from 'react';
import './App.css';

// 👉 Change this to your backend URL on Render
const API_URL = 'https://backend-jv5v.onrender.com/api/auth';

function App() {
  const [activeTab, setActiveTab] = useState('signup');

  return (
    <div className="app">
      <h1>Auth System</h1>

      <div className="tabs">
        <button
          className={activeTab === 'signup' ? 'active' : ''}
          onClick={() => setActiveTab('signup')}
        >
          Signup
        </button>
        <button
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={activeTab === 'forgot' ? 'active' : ''}
          onClick={() => setActiveTab('forgot')}
        >
          Forgot Password
        </button>
      </div>

      <div className="form-container">
        {activeTab === 'signup' && <SignupForm />}
        {activeTab === 'login' && <LoginForm />}
        {activeTab === 'forgot' && <ForgotPasswordForm />}
      </div>
    </div>
  );
}

// ===== SIGNUP FORM =====
function SignupForm() {
  const [step, setStep] = useState(1); // 1: signup, 2: verify OTP
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Signup failed');
        return;
      }

      setMessage(data.message || 'Signup success. OTP sent.');
      setStep(2);
    } catch (err) {
      setError('Network error');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/verify-signup-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, otp }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'OTP verification failed');
        return;
      }

      setMessage(data.message || 'Email verified successfully');
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      {step === 1 && (
        <form onSubmit={handleSignup} className="form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Signup</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="form">
          <p>Enter the OTP sent to your email: {form.email}</p>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

// ===== LOGIN FORM =====
function LoginForm() {
  const [step, setStep] = useState(1); // 1: email+pass, 2: OTP
  const [form, setForm] = useState({ email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      setMessage(data.message || 'OTP sent to email');
      setStep(2);
    } catch (err) {
      setError('Network error');
    }
  };

  const handleVerifyLoginOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/verify-login-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, otp }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'OTP verification failed');
        return;
      }

      setMessage(data.message || 'Login successful');
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {step === 1 && (
        <form onSubmit={handleLogin} className="form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyLoginOtp} className="form">
          <p>Enter the OTP sent to your email: {form.email}</p>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

// ===== FORGOT PASSWORD FORM =====
function ForgotPasswordForm() {
  const [step, setStep] = useState(1); // 1: email, 2: otp+new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to send OTP');
        return;
      }

      setMessage(data.message || 'OTP sent');
      setStep(2);
    } catch (err) {
      setError('Network error');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Reset failed');
        return;
      }

      setMessage(data.message || 'Password reset successful');
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      {step === 1 && (
        <form onSubmit={handleSendOtp} className="form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword} className="form">
          <p>Enter the OTP sent to your email: {email}</p>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
