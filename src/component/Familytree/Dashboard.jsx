import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../services/api";   

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const name = localStorage.getItem("username");
    const email = localStorage.getItem("useremail");

    if (!name || !email) {
      navigate("/login");
      return;
    }

    setUser({ name, email });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await post("/logout"); 
    } catch (err) {
      console.log("Logout API Error:", err);
    }

    localStorage.removeItem("username");
    localStorage.removeItem("useremail");

    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Welcome, {user.name}! 👋</h1>
      <p>Your email: {user.email}</p>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
